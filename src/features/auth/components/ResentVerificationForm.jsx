import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import { Email } from '@mui/icons-material';

export default function ResentVerificationForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage(`Verification email sent to ${email}`);
        } catch (err) {
            setError(err.message || 'Failed to send verification email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Enter your email address and we'll send you a new verification link.
            </Typography>

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

            <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
                {loading ? 'Sending Email...' : 'Resent Verification Email'}
            </Button>
        </Box>
    );
}