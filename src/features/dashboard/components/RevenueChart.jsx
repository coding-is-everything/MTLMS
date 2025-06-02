import { 
    Box, 
    Typography, 
    Skeleton,
    useTheme 
  } from '@mui/material';
  import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Area,
    AreaChart
  } from 'recharts';
  
  export default function RevenueChart({ data, loading }) {
    const theme = useTheme();
    
    if (loading || !data) {
      return (
        <Box sx={{ height: 300 }}>
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      );
    }
    
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <Box sx={{ 
            backgroundColor: theme.palette.background.paper, 
            p: 2, 
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            border: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{label}</Typography>
            <Typography variant="body2" color="primary">
              Revenue: ${payload[0].value.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="secondary">
              Cases: {payload[1]?.value || 0}
            </Typography>
          </Box>
        );
      }
      return null;
    };
  
    return (
      <Box sx={{ 
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius * 2,
        p: 3,
        boxShadow: theme.shadows[2],
        height: '100%'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Revenue Overview
        </Typography>
        
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="month" 
              stroke={theme.palette.text.secondary} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke={theme.palette.text.secondary} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={theme.palette.primary.main} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              name="Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="cases" 
              stroke={theme.palette.secondary.main} 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Cases"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    );
  }