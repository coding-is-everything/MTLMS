import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

export default function TourProgress({ currentStep, totalSteps }) {
    const progress = Math.round((currentStep / totalSteps) * 100);

    return (
        <Box sx={{ mb: 2 }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&.MuiLinearProgress-bar': {
                        borderRadius: 3,
                    }
                }}
            />
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
                Step {currentStep + 1} of {totalSteps}
            </Typography>
        </Box>
    );
}