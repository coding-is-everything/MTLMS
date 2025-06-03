import { 
    Box, 
    Typography, 
    Skeleton,
    useTheme,
    LinearProgress
  } from '@mui/material';
  
  export default function ProductivityGauge({ 
    value, 
    target, 
    label, 
    loading = false 
  }) {
    const theme = useTheme();
    
    if (loading) {
      return (
        <Box sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius * 2,
          p: 3,
          boxShadow: theme.shadows[2],
          height: '100%'
        }}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="rectangular" height={10} sx={{ mt: 2, borderRadius: 5 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 2 }} />
        </Box>
      );
    }
    
    const percentage = Math.min(100, Math.round((value / target) * 100));
    const color = percentage >= 90 ? theme.palette.success.main : 
                 percentage >= 75 ? theme.palette.warning.main : 
                 theme.palette.error.main;
    
    return (
      <Box sx={{ 
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius * 2,
        p: 3,
        boxShadow: theme.shadows[2],
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {label}
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color }}>
              {percentage}%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              of target achieved
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={percentage} 
            sx={{ 
              height: 16, 
              borderRadius: 8,
              backgroundColor: theme.palette.action.disabledBackground,
              '& .MuiLinearProgress-bar': {
                borderRadius: 8,
                backgroundColor: color
              }
            }} 
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Current: {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Target: {target}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }