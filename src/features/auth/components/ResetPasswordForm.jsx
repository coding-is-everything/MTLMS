import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Alert,
    InputAdornment,
    IconButton,
    LinearProgress
} from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
        showPassword: false
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (password) => {
        if (!password) return 0;
        let strength = 0;
        if (password.length > 5) strength += 25;
        if (password.length > 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;
        return Math.min(strength, 100);
    };

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(passwordData.newPassword));
    }, [passwordData.newPassword]);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'newPassword') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const toggleShowPassword = () => {
        setPasswordData(prev => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            await resetPassword(token, passwordData.newPassword);
            setSuccess(true);

            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'Password reset failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Box sm={{ mt: 3 }}>
                <Alert severity="success" sx={{ mb: 3 }}>
                    Password reset successfully! Redirecting to login...
                </Alert>

                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{ py: 1.5 }}
                >
                    Go to Login
                </Button>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Typography variant="body1" sx={{ mb: 2 }}>
                Please enter your new password below.
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type={passwordData.showPassword ? 'text' : 'password'}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {passwordData.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            {passwordData.newPassword && (
                <Box sx={{ mt: 1, mb: 2 }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={passwordStrength} 
                        color={
                            passwordStrength < 30 ? 'error' : 
                            passwordStrength < 70 ? 'warning' : 'success'
                        } 
                        sx={{ height: 4, mb: 0.5 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        {passwordStrength < 30 ? 'Weak' : 
                        passwordStrength < 70 ? 'Medium' : 'Strong'} password
                    </Typography>
                </Box>
            )}

            <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type={passwordData.showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                    startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
                {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                    Remember your password?{' '}
                    <Link href="/login" variant="body2">
                        Sign in
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}