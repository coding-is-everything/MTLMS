import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
    IconButton,
    InputAdornment,
    Grid
} from '@mui/material';
import { QrCode, Sms, Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { useMfa } from '../hooks/useMfa';

export default function MfaVerifyForm({ loginToken, onSuccess }) {
    const [code, setCode] = useState('');
    const [method, setMethod] = useState('totp');
    const [showCode, setShowCode] = useState(false);
    const {
        loading,
        error,
        verifyMfaLogin,
        getMfaMethods,
        mfaMethods
    } = useMfa();

    const handleVerify = async () => {
        try {
            await verifyMfaLogin(code, method, loginToken);
            onSuccess();
        } catch (err) {

        }
    };

    const handleResendCode = async () => {

    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Two-Step Verification
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                For your security, please verify your identity
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item>
                    <Button
                        variant={method === 'totp' ? 'contained' : 'outlined'}
                        startIcon={<QrCode />}
                        onClick={() => setMethod('totp')}
                    >
                        Authenticator
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={method === 'sms' ? 'contained' : 'outlined'}
                        startIcon={<Sms />}
                        onClick={() => setMethod('sms')}
                    >
                        Text Message
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant={method === 'email' ? 'contained' : 'outlined'}
                        startIcon={<Email />}
                        onClick={() => setMethod('email')}
                    >
                        Email
                    </Button>
                </Grid>
            </Grid>

            <TextField
                fullWidth
                label={`${method === 'totp' ? 'Authenticator' : method} Code`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type={showCode ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowCode(!showCode)}
                                edge="end"
                            >
                                {showCode ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={{ mb: 2 }}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={handleVerify}
                disabled={loading || code.length < 6}
                sx={{ py: 1.5, mb: 1 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Verify and Continue'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="text" onClick={handleResendCode}>
                    Resend Code
                </Button>
                <Button variant="text" href="/mfa-recovery">
                    Trouble signing in?
                </Button>
            </Box>
        </Box>
    );
}