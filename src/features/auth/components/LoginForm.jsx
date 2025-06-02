import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Divider,
    Alert
} from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed, Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                    startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                    startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link href="/forgot-password" variant="body2">
                    Forgot Password?
                </Link>
            </Box>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link href="/register" variant="body2">
                        Request Access
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}