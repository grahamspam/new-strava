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
  DialogTitle,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FitnessCenter as StrengthIcon,
  AccessibilityNew as MobilityIcon,
  Healing as RehabIcon,
  SelfImprovement as RecoveryIcon,
  DirectionsRun as CrossTrainingIcon,
  Help as OtherIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { supplementalService } from '../services/api';

const Supplemental = () => {
  const [supplementalWork, setSupplementalWork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplementalWork = async () => {
      try {
        // In a real app, this would fetch from the API
        // const response = await supplementalService.getSupplementals();
        // setSupplementalWork(response.data);
        
        // For now, we'll use mock data
        setSupplementalWork(mockSupplementalWork);
      } catch (err) {
        console.error('Error fetching supplemental work:', err);
        setError('Failed to load supplemental work');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSupplementalWork();
  }, []);

  const handleDeleteClick = (entry) => {
    setEntryToDelete(entry);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!entryToDelete) return;
    
    try {
      // In a real app, this would call the API
      // await supplementalService.deleteSupplemental(entryToDelete._id);
      
      // Update local state
      setSupplementalWork(supplementalWork.filter(s => s._id !== entryToDelete._id));
      setDeleteDialogOpen(false);
      setEntryToDelete(null);
    } catch (err) {
      console.error('Error deleting supplemental work:', err);
      setError('Failed to delete supplemental work');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'strength':
        return <StrengthIcon />;
      case 'mobility':
        return <MobilityIcon />;
      case 'prehab':
      case 'rehab':
        return <RehabIcon />;
      case 'recovery':
        return <RecoveryIcon />;
      case 'cross-training':
        return <CrossTrainingIcon />;
      default:
        return <OtherIcon />;
    }
  };

  // Group supplemental work by type for summary cards
  const supplementalByType = supplementalWork.reduce((acc, entry) => {
    if (!acc[entry.type]) {
      acc[entry.type] = {
        count: 0,
        totalDuration: 0
      };
    }
    acc[entry.type].count += 1;
    acc[entry.type].totalDuration += entry.duration;
    return acc;
  }, {});

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
          Supplemental Work
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/supplemental/new')}
        >
          Add Entry
        </Button>
      </Box>
      
      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(supplementalByType).map(([type, data]) => (
          <Grid item xs={12} sm={6} md={4} key={type}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getTypeIcon(type)}
                  <Typography variant="h6" sx={{ ml: 1, textTransform: 'capitalize' }}>
                    {type}
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {data.count}
                </Typography>
                <Typography color="text.secondary">
                  Sessions
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {data.totalDuration} minutes total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Focus Areas</TableCell>
              <TableCell>Effort</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplementalWork.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getTypeIcon(entry.type)}
                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                      {entry.type}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{format(parseISO(entry.date), 'MMM d, yyyy')}</TableCell>
                <TableCell>{entry.duration} min</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {entry.focusAreas.map((area) => (
                      <Chip 
                        key={area} 
                        label={area} 
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  {entry.perceivedEffort ? `${entry.perceivedEffort}/10` : '-'}
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton 
                      size="small"
                      onClick={() => navigate(`/supplemental/${entry._id}`)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton 
                      size="small"
                      onClick={() => handleDeleteClick(entry)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {supplementalWork.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No supplemental work entries found. Add your first entry to get started.
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
            Are you sure you want to delete this supplemental work entry? This action cannot be undone.
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
const mockSupplementalWork = [
  {
    _id: '1',
    type: 'strength',
    date: '2025-06-22T10:00:00Z',
    duration: 45,
    focusAreas: ['lower-body', 'core'],
    perceivedEffort: 7,
    exercises: [
      { name: 'Squats', sets: 3, reps: 12 },
      { name: 'Lunges', sets: 3, reps: 10 },
      { name: 'Planks', sets: 3, reps: 1 }
    ]
  },
  {
    _id: '2',
    type: 'mobility',
    date: '2025-06-20T18:00:00Z',
    duration: 20,
    focusAreas: ['hips', 'hamstrings'],
    perceivedEffort: 4
  },
  {
    _id: '3',
    type: 'prehab',
    date: '2025-06-19T07:00:00Z',
    duration: 15,
    focusAreas: ['ankles', 'calves'],
    perceivedEffort: 3
  },
  {
    _id: '4',
    type: 'strength',
    date: '2025-06-17T16:30:00Z',
    duration: 60,
    focusAreas: ['full-body'],
    perceivedEffort: 8,
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: 8 },
      { name: 'Push-ups', sets: 3, reps: 15 },
      { name: 'Pull-ups', sets: 3, reps: 8 }
    ]
  },
  {
    _id: '5',
    type: 'recovery',
    date: '2025-06-16T19:00:00Z',
    duration: 30,
    focusAreas: ['full-body'],
    perceivedEffort: 2
  }
];

export default Supplemental;