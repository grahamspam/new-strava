const express = require('express');
const router = express.Router();
const Activity = require('../models/activity.model');
const Supplemental = require('../models/supplemental.model');
const Wellness = require('../models/wellness.model');
const auth = require('../middleware/auth.middleware');

// Get training summary for a time period
router.get('/summary', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Default to last 30 days if no dates provided
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();
    
    // Get running activities
    const runActivities = await Activity.find({
      user: req.user.id,
      type: 'run',
      startDate: { $gte: start, $lte: end }
    }).sort({ startDate: 1 });
    
    // Get supplemental work
    const supplementalWork = await Supplemental.find({
      user: req.user.id,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });
    
    // Calculate summary statistics
    const totalRuns = runActivities.length;
    const totalDistance = runActivities.reduce((sum, activity) => sum + activity.distance, 0);
    const totalDuration = runActivities.reduce((sum, activity) => sum + activity.duration, 0);
    const totalSupplementalSessions = supplementalWork.length;
    const totalSupplementalDuration = supplementalWork.reduce((sum, session) => sum + session.duration, 0);
    
    // Group supplemental work by type
    const supplementalByType = {};
    supplementalWork.forEach(session => {
      if (!supplementalByType[session.type]) {
        supplementalByType[session.type] = 0;
      }
      supplementalByType[session.type] += 1;
    });
    
    res.status(200).json({
      success: true,
      data: {
        period: {
          start,
          end
        },
        running: {
          totalRuns,
          totalDistance,
          totalDuration,
          averageDistance: totalRuns > 0 ? totalDistance / totalRuns : 0,
          averageDuration: totalRuns > 0 ? totalDuration / totalRuns : 0
        },
        supplemental: {
          totalSessions: totalSupplementalSessions,
          totalDuration: totalSupplementalDuration,
          byType: supplementalByType
        }
      }
    });
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating insights',
      error: error.message
    });
  }
});

// Get correlation analysis between supplemental work and running performance
router.get('/correlations', auth, async (req, res) => {
  // This would be a more complex analysis that would require more data processing
  // For now, we'll return a placeholder response
  res.status(501).json({ 
    message: 'Correlation analysis not implemented yet',
    note: 'This endpoint will analyze relationships between supplemental work and running performance/injury risk'
  });
});

// AI assistant endpoint to answer training questions
router.post('/ask', auth, async (req, res) => {
  try {
    const { question } = req.body;
    
    // This would integrate with an NLP service or AI model
    // For now, we'll return a placeholder response
    
    res.status(200).json({
      success: true,
      data: {
        question,
        answer: "This is a placeholder response. In the full implementation, this would use your recent training data to provide a personalized answer to your question."
      }
    });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing question',
      error: error.message
    });
  }
});

module.exports = router;