import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  CircularProgress,
  Chip,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Sync as SyncIcon,
  DirectionsRun as RunIcon,
  DirectionsBike as BikeIcon,
  Pool as SwimIcon,
  FitnessCenter as OtherIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { activityService } from '../services/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // In a real app, this would fetch from the API
        // const response = await activityService.getActivities();
        // setActivities(response.data);
        
        // For now, we'll use mock data
        setActivities(mockActivities);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities');
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, []);

  const handleDeleteClick = (activity) => {
    setActivityToDelete(activity);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!activityToDelete) return;
    
    try {
      // In a real app, this would call the API
      // await activityService.deleteActivity(activityToDelete._id);
      
      // Update local state
      setActivities(activities.filter(a => a._id !== activityToDelete._id));
      setDeleteDialogOpen(false);
      setActivityToDelete(null);
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError('Failed to delete activity');
    }
  };

  const handleSyncStrava = async () => {
    try {
      setLoading(true);
      // In a real app, this would call the API
      // await activityService.syncStrava();
      // const response = await activityService.getActivities();
      // setActivities(response.data);
      
      // For now, just show a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (err) {
      console.error('Error syncing with Strava:', err);
      setError('Failed to sync with Strava');
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'run':
        return <RunIcon />;
      case 'bike':
        return <BikeIcon />;
      case 'swim':
        return <SwimIcon />;
      default:
        return <OtherIcon />;
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${secs}s`;
  };

  const formatDistance = (meters) => {
    return (meters / 1000).toFixed(2) + ' km';
  };

  const formatPace = (secondsPerKm) => {
    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = secondsPerKm % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Activities
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<SyncIcon />} 
            onClick={handleSyncStrava}
            sx={{ mr: 2 }}
          >
            Sync Strava
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/activities/new')}
          >
            Add Activity
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Pace</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity._id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getActivityIcon(activity.type)}
                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                      {activity.type}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{format(parseISO(activity.startDate), 'MMM d, yyyy')}</TableCell>
                <TableCell>{formatDistance(activity.distance)}</TableCell>
                <TableCell>{formatDuration(activity.duration)}</TableCell>
                <TableCell>{activity.averagePace ? formatPace(activity.averagePace) : '-'}</TableCell>
                <TableCell>
                  <Chip 
                    label={activity.source} 
                    size="small"
                    color={activity.source === 'strava' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton 
                      size="small"
                      onClick={() => navigate(`/activities/${activity._id}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      size="small"
                      onClick={() => handleDeleteClick(activity)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {activities.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No activities found. Add your first activity or sync with Strava.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this activity? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// Mock data for development
const mockActivities = [
  {
    _id: '1',
    type: 'run',
    startDate: '2025-06-23T08:30:00Z',
    endDate: '2025-06-23T09:15:00Z',
    duration: 2700, // 45 minutes
    distance: 8500, // 8.5 km
    averagePace: 318, // 5:18 min/km
    source: 'strava'
  },
  {
    _id: '2',
    type: 'run',
    startDate: '2025-06-21T07:00:00Z',
    endDate: '2025-06-21T08:30:00Z',
    duration: 5400, // 90 minutes
    distance: 16000, // 16 km
    averagePace: 337, // 5:37 min/km
    source: 'strava'
  },
  {
    _id: '3',
    type: 'bike',
    startDate: '2025-06-20T16:00:00Z',
    endDate: '2025-06-20T17:00:00Z',
    duration: 3600, // 60 minutes
    distance: 20000, // 20 km
    averagePace: null,
    source: 'strava'
  },
  {
    _id: '4',
    type: 'run',
    startDate: '2025-06-18T06:30:00Z',
    endDate: '2025-06-18T07:00:00Z',
    duration: 1800, // 30 minutes
    distance: 5000, // 5 km
    averagePace: 360, // 6:00 min/km
    source: 'manual'
  }
];

export default Activities;