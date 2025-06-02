import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import MfaVerifyForm from '../components/MfaVerifyForm';
import { useLocation } from 'react-router-dom';
import { useTenant } from '../../../contexts/TenantContext';

export default function MfaVerifyPage() {
  const location = useLocation();
  const loginToken = location.state?.loginToken;
  const { tenant } = useTenant();

  const handleSuccess = () => {
    // This would typically be handled by a global auth context
    window.location.href = '/dashboard';
  };

  if (!loginToken) {
    return (
      <Container maxWidth="sm">
        <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                Invalid Request
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                This page requires a valid login session.
              </Typography>
              <Button variant="contained" href="/login">
                Go to Login
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              backgroundColor: 'primary.main', 
              borderRadius: '50%',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V5M3 12H5M6.31412 6.31412L7.73529 7.73529M17.6859 6.31412L16.2647 7.73529M21 12H19M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM11 12H13V10H11V12Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom>
              Verify Your Identity
            </Typography>
            <Typography color="text.secondary">
              {tenant?.name || 'Lawyer Portal'} - Security Check
            </Typography>
          </Box>
          
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <MfaVerifyForm 
              loginToken={loginToken} 
              onSuccess={handleSuccess} 
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}