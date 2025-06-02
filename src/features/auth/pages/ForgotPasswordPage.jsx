import { Box, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
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
                Forgot Password
              </Typography>
            </Box>
            <ForgotPasswordForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}