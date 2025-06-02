import { Container, Grid, Box, Typography } from '@mui/material';
import MfaSetupCard from '../components/MfaSetupCard';
import { useTenant } from '../../../context/TenantContext';

export default function MfaSetupPage() {
  const { tenant } = useTenant();

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
        <Grid item xs={12} md={10} lg={8}>
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
                <path d="M15 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V9C4 7.89543 4.89543 7 6 7H9M15 7V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V7M15 7H9M10 12H11M11 12H14M11 12V14M11 12V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom>
              Secure Your Account
            </Typography>
            <Typography color="text.secondary">
              {tenant?.name || 'Lawyer Portal'} - Multi-Factor Authentication
            </Typography>
          </Box>
          
          <MfaSetupCard />
        </Grid>
      </Grid>
    </Container>
  );
}