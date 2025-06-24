import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  CircularProgress,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Send as SendIcon,
  Psychology as AiIcon
} from '@mui/icons-material';
import { format, subDays, subMonths } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { insightService } from '../services/api';

const Insights = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [timeRange, setTimeRange] = useState('30');
  const [tabValue, setTabValue] = useState(0);
  
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    setError('');
    setAnswer('');
    
    try {
      // In a real app, this would call the API
      // const response = await insightService.askQuestion(question);
      // setAnswer(response.data.answer);
      
      // For now, we'll use a mock response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnswer(getMockAnswer(question));
    } catch (err) {
      console.error('Error getting answer:', err);
      setError('Failed to get answer from AI assistant');
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Training Insights
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="AI Assistant" />
          <Tab label="Training Analysis" />
          <Tab label="Correlations" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AiIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                <Typography variant="h5">
                  Training Assistant
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                Ask questions about your training, and get personalized insights based on your data.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Example questions:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setQuestion("Why have my easy runs felt sluggish lately?")}
                >
                  Why have my easy runs felt sluggish lately?
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setQuestion("Is it smart to do a workout tomorrow given my sleep this week?")}
                >
                  Is it smart to do a workout tomorrow?
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setQuestion("How does my supplemental work affect my running performance?")}
                >
                  How does supplemental work affect my running?
                </Button>
              </Box>
              
              <Box component="form" onSubmit={handleQuestionSubmit}>
                <TextField
                  fullWidth
                  label="Ask a question about your training"
                  variant="outlined"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  disabled={loading || !question.trim()}
                >
                  {loading ? 'Analyzing...' : 'Ask'}
                </Button>
              </Box>
              
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <CircularProgress />
                </Box>
              )}
              
              {error && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                  <Typography color="error">{error}</Typography>
                </Box>
              )}
              
              {answer && (
                <Paper elevation={2} sx={{ mt: 4, p: 3, bgcolor: 'background.paper' }}>
                  <Typography variant="h6" gutterBottom>
                    Response:
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {answer}
                  </Typography>
                </Paper>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                  Training Volume Analysis
                </Typography>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Time Range</InputLabel>
                  <Select
                    value={timeRange}
                    label="Time Range"
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <MenuItem value="7">Last 7 days</MenuItem>
                    <MenuItem value="30">Last 30 days</MenuItem>
                    <MenuItem value="90">Last 3 months</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={mockVolumeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="distance" stroke="#8884d8" name="Distance (km)" />
                  <Line yAxisId="right" type="monotone" dataKey="supplementalMinutes" stroke="#82ca9d" name="Supplemental (min)" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Running Intensity Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={mockIntensityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockIntensityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Supplemental Work Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={mockSupplementalTypeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="minutes" fill="#82ca9d" name="Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Correlation Analysis
              </Typography>
              <Typography variant="body1" paragraph>
                Discover relationships between different aspects of your training.
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Supplemental Work & Injury Risk
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Correlation between supplemental work consistency and injury risk factors.
                      </Typography>
                      <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                          More data needed for meaningful analysis
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Sleep Quality & Performance
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        How sleep quality affects your running performance.
                      </Typography>
                      <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1" color="text.secondary">
                          More data needed for meaningful analysis
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Training Load & Recovery
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Relationship between training load and recovery metrics.
                      </Typography>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart
                          data={mockLoadRecoveryData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="load" stroke="#8884d8" name="Training Load" />
                          <Line yAxisId="right" type="monotone" dataKey="recovery" stroke="#82ca9d" name="Recovery Score" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

// Mock data for development
const mockVolumeData = [
  { date: 'Week 1', distance: 30, supplementalMinutes: 90 },
  { date: 'Week 2', distance: 35, supplementalMinutes: 120 },
  { date: 'Week 3', distance: 42, supplementalMinutes: 150 },
  { date: 'Week 4', distance: 38, supplementalMinutes: 135 }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const mockIntensityData = [
  { name: 'Easy', value: 70 },
  { name: 'Moderate', value: 20 },
  { name: 'Hard', value: 10 }
];

const mockSupplementalTypeData = [
  { name: 'Strength', minutes: 120 },
  { name: 'Mobility', minutes: 60 },
  { name: 'Prehab', minutes: 45 },
  { name: 'Recovery', minutes: 90 }
];

const mockLoadRecoveryData = [
  { date: 'Mon', load: 65, recovery: 85 },
  { date: 'Tue', load: 80, recovery: 75 },
  { date: 'Wed', load: 45, recovery: 80 },
  { date: 'Thu', load: 90, recovery: 65 },
  { date: 'Fri', load: 50, recovery: 75 },
  { date: 'Sat', load: 85, recovery: 70 },
  { date: 'Sun', load: 40, recovery: 90 }
];

// Mock AI assistant responses
const getMockAnswer = (question) => {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('sluggish') || lowerQuestion.includes('tired')) {
    return "Based on your recent training data, your easy runs might feel sluggish due to a few factors:\n\n1. Your sleep quality has averaged only 6.2 hours over the past week, which is below your usual 7.5 hour average.\n\n2. You've increased your weekly mileage by 20% over the last two weeks, which may be causing accumulated fatigue.\n\n3. You've done less recovery work recently - only 1 recovery session in the past 10 days compared to your usual 2-3 sessions per week.\n\nConsider taking an extra rest day this week and prioritizing sleep and recovery work before your next key workout.";
  }
  
  if (lowerQuestion.includes('workout tomorrow') || lowerQuestion.includes('smart to do')) {
    return "Looking at your recent training patterns and recovery metrics:\n\n- Your sleep scores have been below average for 3 consecutive nights\n- You completed a hard workout just 2 days ago\n- Your reported soreness levels are elevated in your quads and calves\n\nGiven these factors, it would be prudent to postpone tomorrow's planned workout and instead do an easy recovery run or cross-training. This will allow your body more time to absorb the previous hard effort and reduce injury risk.\n\nIf you're determined to do the workout, consider reducing the intensity by 10-15% and being prepared to cut it short if you're not feeling good after the warmup.";
  }
  
  if (lowerQuestion.includes('supplemental') || lowerQuestion.includes('strength')) {
    return "Analyzing your data shows a positive correlation between consistent supplemental work and running performance:\n\n1. In weeks where you completed 2+ strength sessions, your running economy improved by approximately 3% (based on pace at similar heart rates).\n\n2. Your injury risk markers (reported soreness, range of motion tests) show improvement when you maintain regular mobility work.\n\n3. Specifically, your hamstring tightness issues appear less frequently when you complete your hip/hamstring mobility routine at least twice weekly.\n\nThe data suggests that your supplemental work is most effective when distributed throughout the week rather than clustered on consecutive days. Consider maintaining 2-3 strength sessions and 2-3 mobility sessions weekly, spaced evenly between running days.";
  }
  
  return "I don't have enough training data yet to provide a specific answer to that question. As you continue logging your activities and supplemental work, I'll be able to offer more personalized insights about your training patterns.";
};

export default Insights;