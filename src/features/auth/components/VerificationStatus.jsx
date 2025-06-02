import { Box, CircularProgress, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

export default function VerificationStatus({ status, message }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4
        }}>
            {status === 'loading' && (
                <>
                    <CircularProgress size={80} thickness={4} sx={{ mb: 3 }} />
                    <Typography variant="h5" gutterBottom>
                        Verifying your email address...
                    </Typography>
                    <Typography color="text.secondary">
                        Please wait while we confirm your email address.
                    </Typography>
                </>
            )}
            {status === 'success' && (
                <>
                    <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                    <Typography variant='h4' gutterBottom>
                        Email Verified!
                    </Typography>
                    <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
                        {message || 'Your email has been successfully verified.'}
                    </Typography>
                    <Typography color="text.secondary">
                        You can now access all features of the application.
                    </Typography>
                </>
            )}

            {status === 'error' && (
                <>
                    <Error sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                    <Typography variant="h4" gutterBottom>
                        Verification Failed
                    </Typography>
                    <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                        {message || 'The verification link is invaild or has expired.'}
                    </Typography>
                    <Typography color="text.secondary">
                        Please request a new verification email.
                    </Typography>
                </>
            )}
        </Box>
    );
}