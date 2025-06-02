import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import MfaRecoveryForm from '../components/MfaRecoveryForm';
import { useTenant } from '../../../contexts/TenantContext';

export default function MfaRecoveryPage() {
  const { tenant } = useTenant();

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
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                <path d="M12 16V12M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom>
              Account Recovery
            </Typography>
            <Typography color="text.secondary">
              {tenant?.name || 'Lawyer Portal'} - MFA Recovery
            </Typography>
          </Box>
          
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <MfaRecoveryForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}