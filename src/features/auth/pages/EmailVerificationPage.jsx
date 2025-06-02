import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';
import VerificationStatus from '../components/VerificationStatus';
import { useAuth } from '../hooks/useAuth';

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing');
        return;
      }

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Actual verification would look like:
        // await verifyEmail(token);
        
        setStatus('success');
        setMessage('Your email has been successfully verified!');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => navigate('/dashboard'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Email verification failed');
      }
    };

    verifyToken();
  }, [token, navigate, verifyEmail]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        py: 8 
      }}>
        <VerificationStatus status={status} message={message} />
        
        {status === 'error' && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              href="/resend-verification"
              sx={{ px: 4, py: 1.5 }}
            >
              Resend Verification Email
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}