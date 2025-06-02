import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useSearchParams } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <Container maxWidth="lg">
        <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Invalid Reset Link
                </Typography>
                <Typography color="error" sx={{ mb: 3 }}>
                  The password reset link is invalid or has expired.
                </Typography>
                <Link href="/forgot-password" variant="body1">
                  Request a new reset link
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Link href="/login" sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowBack sx={{ mr: 1 }} /> Back to login
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Reset Password
              </Typography>
              <Typography color="text.secondary">
                Create a new password for your account
              </Typography>
            </Box>
            <ResetPasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}