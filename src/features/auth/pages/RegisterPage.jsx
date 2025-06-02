import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import RegistrationForm from '../components/RegistrationForm';
import { useTenant } from '../../../context/TenantContext';

export default function RegisterPage() {
  const { tenant } = useTenant();
  const appName = tenant?.name || 'Lawyer Portal';

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="center" sx={{ minHeight: '100vh', py: 8 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Join {appName}
              </Typography>
              <Typography color="text.secondary">
                Create your professional account
              </Typography>
            </Box>
            <RegistrationForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}