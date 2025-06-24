import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { 
  DirectionsRun as RunIcon, 
  FitnessCenter as StrengthIcon, 
  Insights as InsightsIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, subDays } from 'date-fns';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { insightService } from '../services/api';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
        const endDate = format(new Date(), 'yyyy-MM-dd');
        
        // In a real app, this would fetch from the API
        // const response = await insightService.getSummary(startDate, endDate);
        // setSummary(response.data);
        
        // For now, we'll use mock data
        setSummary(mockSummary);
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error" variant="h6">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h4" gutterBottom>
              Welcome to Runner's Insight
            </Typography>
            <Typography variant="body1">
              Your training dashboard for the last 30 days
            </Typography>
          </Paper>
        </Grid>
        
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RunIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Running</Typography>
              </Box>
              <Typography variant="h3" component="div">
                {summary.running.totalRuns}
              </Typography>
              <Typography color="text.secondary">
                Total Runs
              </Typography>
              <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                {(summary.running.totalDistance / 1000).toFixed(1)} km
              </Typography>
              <Typography color="text.secondary">
                Total Distance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StrengthIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Supplemental Work</Typography>
              </Box>
              <Typography variant="h3" component="div">
                {summary.supplemental.totalSessions}
              </Typography>
              <Typography color="text.secondary">
                Total Sessions
              </Typography>
              <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                {summary.supplemental.totalDuration} min
              </Typography>
              <Typography color="text.secondary">
                Total Duration
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InsightsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Quick Actions</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/activities/new')}
                >
                  Log Run
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/supplemental/new')}
                >
                  Log Supplemental Work
                </Button>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/insights')}
                >
                  View Insights
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Distance
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockWeeklyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="distance" fill="#8884d8" name="Distance (km)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Supplemental Work by Type
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={Object.entries(summary.supplemental.byType).map(([type, count]) => ({
                  type,
                  count
                }))}
                margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="type" type="category" />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Mock data for development
const mockSummary = {
  period: {
    start: '2025-05-25',
    end: '2025-06-24'
  },
  running: {
    totalRuns: 18,
    totalDistance: 145000, // 145 km
    totalDuration: 46800, // 13 hours
    averageDistance: 8055.56, // ~8 km per run
    averageDuration: 2600 // ~43 min per run
  },
  supplemental: {
    totalSessions: 12,
    totalDuration: 360, // 6 hours
    byType: {
      'strength': 5,
      'mobility': 3,
      'prehab': 2,
      'recovery': 2
    }
  }
};

const mockWeeklyData = [
  { week: 'Week 1', distance: 30 },
  { week: 'Week 2', distance: 35 },
  { week: 'Week 3', distance: 42 },
  { week: 'Week 4', distance: 38 }
];

export default Dashboard;