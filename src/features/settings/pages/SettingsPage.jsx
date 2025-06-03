import { Container, Paper, Typography } from '@mui/material';
import SecuritySettings from '../components/SecuritySettings';

export default function SettingsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <SecuritySettings />
      </Paper>
      
      {/* Add more settings sections here as needed */}
    </Container>
  );
}
