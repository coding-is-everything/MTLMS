// Import necessary React hooks and Material-UI components
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { QrCode, Refresh, Visibility, VisibilityOff } from '@mui/icons-material';
// Import custom hook for MFA functionality
import { useMfa } from '../hooks/useMfa';

// Main MFA Setup Component
export default function MfaSetupCard() {
  // State management for the MFA setup flow
  const [step, setStep] = useState(1); // Tracks current step: 1 = method select, 2 = setup, 3 = verify, 4 = success
  const [method, setMethod] = useState('totp'); // Stores selected MFA method (totp, sms, etc.)
  const [code, setCode] = useState(''); // Stores the verification code entered by user
  const [showCode, setShowCode] = useState(false); // Toggles visibility of the verification code
  // Destructure values and functions from the useMfa custom hook
  const { 
    loading, // Loading state for async operations
    error, // Error message if any operation fails
    qrCode, // QR code data for authenticator app setup
    backupCodes, // Backup codes for recovery
    startMfaSetup, // Function to start MFA setup process
    verifyMfaSetup // Function to verify the MFA setup
  } = useMfa();

  // Effect hook that runs when step or method changes
  useEffect(() => {
    // Only start MFA setup if we're on step 2 (setup) and method is 'totp'
    if (step === 2 && method === 'totp') {
      startMfaSetup();
    }
  }, [step, method]); // Dependencies: re-run when step or method changes

  // Handle starting the MFA setup process
  const handleStartSetup = async () => {
    // For SMS or email methods, start setup and skip to verification
    if (method === 'sms' || method === 'email') {
      try {
        await startMfaSetup(method);
        setStep(3); // Move to verification step (skip QR code for non-TOTP methods)
      } catch (err) {
        // Error is already handled in the useMfa hook
      }
    } else {
      // For TOTP, just move to the next step (shows QR code)
      setStep(2);
    }
  };

  // Handle verification of the MFA code
  const handleVerify = async () => {
    try {
      // Call the verification function with the entered code and method
      await verifyMfaSetup(code, method);
      // If successful, move to success step
      setStep(4);
    } catch (err) {
      // Error is already handled in the useMfa hook
    }
  };

  // Renders different UI based on the current step
  const renderStepContent = () => {
    // Switch statement to handle different steps in the MFA setup flow
    switch (step) {
      // Step 1: Show method selection UI
      case 1: // Method selection screen
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
              Choose Authentication Method
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={method === 'totp' ? 3 : 1} 
                  onClick={() => setMethod('totp')}
                  sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    border: method === 'totp' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#1976d2',
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <QrCode sx={{ mr: 1.5, color: 'primary.main' }} />
                    <Typography variant="subtitle1">Authenticator App</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Use an app like Google Authenticator or Authy
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Paper 
                  elevation={method === 'sms' ? 3 : 1} 
                  onClick={() => setMethod('sms')}
                  sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    border: method === 'sms' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#1976d2',
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">Text Message (SMS)</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Receive codes via SMS to your phone
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleStartSetup}
              disabled={loading}
              sx={{ mt: 3, py: 1.5 }}
            >
              Continue
            </Button>
          </Box>
        );
      
      // Step 2: Show TOTP setup with QR code
      case 2: // TOTP Setup screen
        return (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Set Up Authenticator App
            </Typography>
            
            {loading ? (
              <CircularProgress sx={{ my: 3 }} />
            ) : error ? (
              <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
            ) : (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Scan this QR code with your authenticator app
                </Typography>
                
                <Box sx={{ 
                  display: 'inline-block', 
                  p: 2, 
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: 1,
                  mb: 3
                }}>
                  {qrCode ? (
                    <img 
                      src={qrCode} 
                      alt="MFA QR Code" 
                      style={{ width: 200, height: 200 }} 
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Can't scan the QR code? Enter this code manually: <b>JBSWY3DPEHPK3PXP</b>
                </Typography>
                
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => startMfaSetup()}
                  sx={{ mb: 3 }}
                >
                  Generate New QR Code
                </Button>
                
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setStep(3)}
                  sx={{ py: 1.5 }}
                >
                  I've Scanned the Code
                </Button>
              </>
            )}
          </Box>
        );
      
      // Step 3: Show verification input field
      case 3: // Verification screen
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Verify {method === 'totp' ? 'Authenticator' : method.toUpperCase()} Code
            </Typography>
            
            {method === 'totp' ? (
              <Typography variant="body1" sx={{ mb: 2 }}>
                Enter the 6-digit code from your authenticator app
              </Typography>
            ) : (
              <Typography variant="body1" sx={{ mb: 2 }}>
                We've sent a 6-digit code to your {method === 'sms' ? 'phone' : 'email'}
              </Typography>
            )}
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <TextField
              fullWidth
              label="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type={showCode ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowCode(!showCode)}
                      edge="end"
                    >
                      {showCode ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
            
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerify}
              disabled={loading || code.length < 6}
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify and Enable MFA'}
            </Button>
          </Box>
        );
      
      // Step 4: Show success message
      case 4: // Success screen
        return (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Box sx={{
              display: 'inline-flex',
              bgcolor: 'success.light',
              borderRadius: '50%',
              p: 2,
              mb: 3
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M12 3V4M18 12H17.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.1974 3 16.2361 3.745 17.8916 5" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            
            <Typography variant="h5" gutterBottom>
              Multi-Factor Authentication Enabled
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your account is now protected with an extra layer of security.
            </Typography>
            
            <Button
              variant="contained"
              href="/dashboard"
              sx={{ py: 1.5, px: 4 }}
            >
              Go to Dashboard
            </Button>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
        Set Up Multi-Factor Authentication
      </Typography>
      
      <Typography variant="body1" color="text.secondary">
        Add an extra layer of security to your account by enabling MFA. 
        You'll need to provide a verification code each time you sign in.
      </Typography>
      
      {renderStepContent()}
    </Paper>
  );
}