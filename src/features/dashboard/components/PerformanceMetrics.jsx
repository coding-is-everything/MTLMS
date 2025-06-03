import { 
    Box, 
    Grid, 
    Typography, 
    useTheme,
    Paper,
    Divider
  } from '@mui/material';
  import MetricCard from './MetricsCard';
  import RevenueChart from './RevenueChart';
  import CaseTypeDistribution from './CaseTypeDistribution';
  import ProductivityGauge from './ProductivityGauge';
  import useDashboardMetrics from '../hooks/useDashboardMetrics';
  import { 
    AttachMoney, 
    Description, 
    People, 
    Schedule,
    TrendingUp,
    Checklist
  } from '@mui/icons-material';
  
  export default function PerformanceMetrics() {
    const theme = useTheme();
    const { metrics, loading, error } = useDashboardMetrics();
    
    // Sample data structure if API returns null
    const defaultMetrics = {
      revenue: 125640,
      revenueChange: 12.5,
      cases: 42,
      casesChange: -3.2,
      clients: 28,
      clientsChange: 5.7,
      hours: 186,
      hoursChange: 8.2,
      revenueData: [
        { month: 'Jan', revenue: 12000, cases: 8 },
        { month: 'Feb', revenue: 19000, cases: 11 },
        { month: 'Mar', revenue: 15000, cases: 9 },
        { month: 'Apr', revenue: 18000, cases: 10 },
        { month: 'May', revenue: 22000, cases: 14 },
        { month: 'Jun', revenue: 25000, cases: 16 },
        { month: 'Jul', revenue: 28000, cases: 18 },
      ],
      caseDistribution: [
        { name: 'Corporate', value: 12 },
        { name: 'Litigation', value: 8 },
        { name: 'Real Estate', value: 7 },
        { name: 'Family Law', value: 6 },
        { name: 'Intellectual Property', value: 5 },
        { name: 'Other', value: 4 },
      ],
      productivity: {
        billableHours: 142,
        targetHours: 160,
        caseResolution: 38,
        targetResolution: 45
      }
    };
    
    const data = metrics || defaultMetrics;
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Performance Dashboard
        </Typography>
        
        {error && (
          <Paper sx={{ p: 3, mb: 3, backgroundColor: theme.palette.error.light }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard 
              title="Total Revenue" 
              value={`$${data.revenue.toLocaleString()}`}
              change={data.revenueChange}
              changeType={data.revenueChange >= 0 ? "increase" : "decrease"}
              icon={<AttachMoney />}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard 
              title="Active Cases" 
              value={data.cases}
              change={data.casesChange}
              changeType={data.casesChange >= 0 ? "increase" : "decrease"}
              icon={<Description />}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard 
              title="Active Clients" 
              value={data.clients}
              change={data.clientsChange}
              changeType={data.clientsChange >= 0 ? "increase" : "decrease"}
              icon={<People />}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard 
              title="Billable Hours" 
              value={data.hours}
              change={data.hoursChange}
              changeType={data.hoursChange >= 0 ? "increase" : "decrease"}
              icon={<Schedule />}
              loading={loading}
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <RevenueChart 
              data={data.revenueData} 
              loading={loading} 
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CaseTypeDistribution 
              data={data.caseDistribution} 
              loading={loading} 
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProductivityGauge 
              value={data.productivity.billableHours}
              target={data.productivity.targetHours}
              label="Billable Hours Productivity"
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductivityGauge 
              value={data.productivity.caseResolution}
              target={data.productivity.targetResolution}
              label="Case Resolution Rate"
              loading={loading}
            />
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ 
          backgroundColor: theme.palette.primary.light, 
          borderRadius: theme.shape.borderRadius * 2,
          p: 3,
          display: 'flex',
          alignItems: 'center'
        }}>
          <TrendingUp sx={{ 
            fontSize: 40, 
            color: theme.palette.primary.main,
            mr: 2
          }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Performance Insights
            </Typography>
            <Typography variant="body1">
              {data.revenueChange >= 0 
                ? `Revenue is up ${data.revenueChange}% from last month. Keep up the good work!` 
                : `Revenue is down ${Math.abs(data.revenueChange)}% from last month. Focus on closing more cases.`}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }