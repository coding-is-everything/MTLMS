import { useState } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

export function useMfa() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [mfaMethods, setMfaMethods] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const startMfaSetup = async (method ='totp') => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/mfa/setup', { method });

            if (method === 'totp') {
                setQrCode(response.data.qrCode);
            }

            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to start MFA setup');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyMfaSetup = async (code, method = 'totp') => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/mfa/verify-setup', {
                code,
                method
            });

            setBackupCodes(response.data.backupCodes);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const verifyMfaLogin = async (code, method, loginToken) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/mfa/verify-login', {
                code,
                method,
                loginToken
            });

            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'MFA verification failed.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getMfaMethods = async() => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get('/api/auth/mfa/methods');
            setMfaMethods(response.data.methods);
            return response.data;
        } catch (err) {
            setError('Failed to load MFA methods.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const sendRecoveryCode = async (email) => {
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/auth/mfa/send-recovery', { email });
            return true;
        } catch (err) {
            setError('Failed to send recovery code.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const recoverAccount = async (code, newPassword) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/mfa/recover', {
                code,
                newPassword
            });

            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            return response.data;
        } catch (err) {
            setError('Account recovery failed.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        qrCode,
        backupCodes,
        mfaMethods,
        startMfaSetup,
        verifyMfaSetup,
        verifyMfaLogin,
        getMfaMethods,
        sendRecoveryCode,
        recoverAccount
    };
}