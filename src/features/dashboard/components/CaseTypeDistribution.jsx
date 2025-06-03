import { 
    Box, 
    Typography, 
    Skeleton,
    useTheme 
  } from '@mui/material';
  import { 
    PieChart, 
    Pie, 
    Cell, 
    ResponsiveContainer,
    Legend,
    Tooltip
  } from 'recharts';
  
  const RADIAN = Math.PI / 180;
  
  export default function CaseTypeDistribution({ data, loading }) {
    const theme = useTheme();
    
    if (loading || !data) {
      return (
        <Box sx={{ height: 300 }}>
          <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
        </Box>
      );
    }
    
    const COLORS = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main,
    ];
    
    const renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
      return (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor="middle" 
          dominantBaseline="central"
          fontSize={12}
          fontWeight={600}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <Box sx={{ 
            backgroundColor: theme.palette.background.paper, 
            p: 2, 
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            border: `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{payload[0].name}</Typography>
            <Typography variant="body2">
              Cases: {payload[0].value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {(payload[0].percent * 100).toFixed(1)}% of total
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
          Case Type Distribution
        </Typography>
        
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry, index) => (
                <Typography variant="body2" color="text.secondary">
                  {value}
                </Typography>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );
  }