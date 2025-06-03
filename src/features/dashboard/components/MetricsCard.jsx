import {
    Box,
    Typography,
    Skeleton,
    styled,
    useTheme
} from '@mui/material';

import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const StyledCard = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[2],
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
    }
}));

export default function MetricsCard({
    title,
    value,
    change,
    changeType,
    icon,
    loading = false
}) {
    const theme = useTheme();

    if (loading) {
        return (
            <StyledCard>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={40} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
            </StyledCard>
        );
    }

    const isPositive = changeType === 'increase';
    const color = isPositive ? theme.palette.success.main : theme.paletter.error.main;

    return (
        <StyledCard>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                    {title}
                </Typography>
                <Box
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main
                    }}
                >
                    {icon}
                </Box>
            </Box>

            <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
                {value}
            </Typography>

            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                {isPositive ? (
                    <ArrowUpward sx={{ color, fontSize: 16 }} />
                ) : (
                    <ArrowDownward sx={{ color, fontSize: 16 }} />
                )}
                <Typography variant="body2" sx={{ color, ml: 0.5 }}>
                    {change}%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs last month
                </Typography>
            </Box>
        </StyledCard>
    );
}