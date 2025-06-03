import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton, 
  Divider, 
  styled 
} from '@mui/material';
import { Close, ArrowBack, ArrowForward } from '@mui/icons-material';
import TourProgress from './TourProgress';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: '10px 24px',
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  }
}));

export default function TourStep({ 
  step, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  onClose 
}) {
  const { title, content, primaryAction, secondaryAction } = step;
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
        {content}
      </Typography>
      
      <TourProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Box>
          {currentStep > 0 && (
            <Button 
              onClick={onPrev} 
              startIcon={<ArrowBack />}
              sx={{ borderRadius: 50, px: 3 }}
            >
              Back
            </Button>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {secondaryAction && (
            <StyledButton 
              variant="outlined" 
              color="primary"
              onClick={secondaryAction.action}
            >
              {secondaryAction.label}
            </StyledButton>
          )}
          
          <StyledButton 
            variant="contained" 
            color="primary"
            endIcon={<ArrowForward />}
            onClick={onNext}
          >
            {primaryAction.label}
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
}