import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Alert,
  Link
} from '@mui/material';
import { Email, LockReset } from '@mui/icons-material';
import { useMfa } from '../hooks/useMfa';

export default function MfaRecoveryForm() {
  const [step, setStep] = useState(1); // 1 = email, 2 = code, 3 = password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { 
    loading, 
    error, 
    sendRecoveryCode, 
    recoverAccount 
  } = useMfa();

  const handleSendCode = async () => {
    try {
      await sendRecoveryCode(email);
      setStep(2);
    } catch (err) {
      // Error handled in hook
    }
  };

  const handleRecoverAccount = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      await recoverAccount(code, password);
    } catch (err) {
      // Error handled in hook
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      {step === 1 && (
        <>
          <Typography variant="h6" gutterBottom>
            Recover Your Account
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Enter your email address to receive a recovery code
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            fullWidth
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />
            }}
            sx={{ mb: 2 }}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleSendCode}
            disabled={loading || !email}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Recovery Code'}
          </Button>
        </>
      )}
      
      {step === 2 && (
        <>
          <Typography variant="h6" gutterBottom>
            Verify Recovery Code
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            We've sent a 6-digit recovery code to your email. Enter it below.
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            fullWidth
            label="Recovery Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={() => setStep(3)}
            disabled={loading || code.length < 6}
            sx={{ py: 1.5, mb: 1 }}
          >
            Verify Code
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="text" onClick={handleSendCode}>
              Resend Code
            </Button>
          </Box>
        </>
      )}
      
      {step === 3 && (
        <>
          <Typography variant="h6" gutterBottom>
            Reset Your Password
          </Typography>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Create a new password for your account
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockReset sx={{ color: 'action.active', mr: 1 }} />
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockReset sx={{ color: 'action.active', mr: 1 }} />
            }}
            sx={{ mb: 2 }}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleRecoverAccount}
            disabled={loading || !password || password !== confirmPassword}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Reset Password'}
          </Button>
        </>
      )}
      
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Link href="/login" variant="body2">
          Back to login
        </Link>
      </Box>
    </Box>
  );
}