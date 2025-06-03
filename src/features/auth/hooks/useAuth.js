import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { useTenant } from '../../../context/TenantContext';

export function useAuth() {
    const auth = useAuthContext();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { tenant } = useTenant();

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
                tenantId: tenant?.id
            });
            
            // If MFA is required, return the login token without setting the auth token
            if (response.data.requiresMfa) {
                return {
                    requiresMfa: true,
                    loginToken: response.data.loginToken
                };
            }
            
            // If no MFA required, proceed with normal login
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/api/auth/register', {
                ...userData,
                tenantId: tenant?.id
            });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const resetPassword = async (token, newPassword) => {
        const response = await axios.post('/api/auth/reset-password', {
            token,
            newPassword
        });

        if (!response.data.success) {
            throw new Error(response.data.message || 'Password reset failed.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    //Add these function to your existing useAuth hook
    const verifyEmail = async (token) => {
        const response = await axios.post('/api/auth/verify-email', { token });

        if (!response.data.success) {
            throw new Error(response.data.message || 'Email verification failed.');
        }

        setUser(prev => ({ ...prev, emailVerified: true }));
    };

    const resendVerificationEmail = async (email) => {
        const response = await axios.post('/api/auth/resend-verification', { email });

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to resend verification email.');
        }
    };

    return { 
        user: user || auth.currentUser, 
        login, 
        logout,
        register,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
        currentTenant: tenant
    };
}