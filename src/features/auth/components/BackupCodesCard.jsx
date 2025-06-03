import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  IconButton
} from '@mui/material';
import { ContentCopy, Download } from '@mui/icons-material';

export default function BackupCodesCard({ codes }) {
  const [copied, setCopied] = useState(false);
  
  const copyCodes = () => {
    const text = codes.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadCodes = () => {
    const text = codes.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mfa-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
        Backup Codes
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Save these backup codes in a secure place. Each code can be used only once 
        if you lose access to your authentication device.
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {codes.map((code, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Paper 
              sx={{ 
                p: 1.5, 
                textAlign: 'center', 
                fontWeight: 'bold',
                backgroundColor: 'action.hover',
                borderRadius: 1
              }}
            >
              {code}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ContentCopy />}
          onClick={copyCodes}
          sx={{ flex: 1 }}
        >
          {copied ? 'Copied!' : 'Copy Codes'}
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={downloadCodes}
          sx={{ flex: 1 }}
        >
          Download
        </Button>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
        Note: These codes are only shown once. Make sure to save them now.
      </Typography>
    </Paper>
  );
}