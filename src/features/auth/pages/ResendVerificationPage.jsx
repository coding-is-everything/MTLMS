import { Container, Grid, Paper, Box, Typography, Link } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import ResentVerificationForm from '../components/ResentVerificationForm';
import EmailVerificationCard from '../components/EmailVerificationCard';
import { useTenant } from '../../../context/TenantContext';

export default function ResendVerificationPage() {
  const { tenant } = useTenant();

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
        <Grid item xs={12} md={8} lg={6}>
          <Box sx={{ mb: 2 }}>
            <Link href="/login" sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowBack sx={{ mr: 1 }} /> Back to login
            </Link>
          </Box>
          
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Resend Verification Email
              </Typography>
              <Typography color="text.secondary">
                {tenant?.name || 'Lawyer Portal'} - Account Verification
              </Typography>
            </Box>
            <ResentVerificationForm />
          </Paper>
          
          <EmailVerificationCard />
        </Grid>
      </Grid>
    </Container>
  );
}