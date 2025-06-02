import {
    Box,
    Button,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import { MarkEmailRead } from '@mui/icons-material';

export default function EmailVerificationCard() {
    return (
        <Card sx={{
            maxWidth: 500,
            mx: 'auto',
            mt: 4,
            borderRadius: 2,
            boxShadow: 3,
            borderLeft: '4px solid',
            borderColor: 'primary.main'
        }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <MarkEmailRead sx={{
                    fontSize: 64,
                    color: 'primary.main',
                    mb: 2
                }} />

                <Typography variant="h5" gutterBottom>
                    Verify Your Email Address
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    We've sent a verification link to your email address.
                    Please check your inbox and click the link to activate your account.
                </Typography>

                <Box sx={{
                    backgroundColor: 'action.hover',
                    borderRadius: 1,
                    p: 2,
                    mb: 3,
                    textAlign: 'left'
                }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Didn't receive the email?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Check your spam folder or request a new verification email.
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    color="primary"
                    href="/resend-verification"
                    fullWidth
                    sx={{ py: 1.5 }}
                >
                    Resend Verification Email
                </Button>
            </CardContent>
        </Card>
    );
}