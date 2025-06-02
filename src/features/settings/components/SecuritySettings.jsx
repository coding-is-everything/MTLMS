import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SecuritySettings() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Multi-Factor Authentication
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Add an extra layer of security to your account by enabling multi-factor authentication.
      </Typography>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/mfa-setup')}
        sx={{ mt: 1 }}
      >
        Manage MFA Settings
      </Button>
    </Box>
  );
}
