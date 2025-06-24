const express = require('express');
const router = express.Router();
const Activity = require('../models/activity.model');
const auth = require('../middleware/auth.middleware');

// Get all activities for a user
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ startDate: -1 });
    
    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
});

// Get a single activity
router.get('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: error.message
    });
  }
});

// Create a new activity
router.post('/', auth, async (req, res) => {
  try {
    const newActivity = new Activity({
      ...req.body,
      user: req.user.id
    });
    
    await newActivity.save();
    
    res.status(201).json({
      success: true,
      data: newActivity
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating activity',
      error: error.message
    });
  }
});

// Update an activity
router.put('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating activity',
      error: error.message
    });
  }
});

// Delete an activity
router.delete('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting activity',
      error: error.message
    });
  }
});

// Sync activities from Strava (placeholder)
router.post('/sync/strava', auth, async (req, res) => {
  res.status(501).json({ message: 'Strava sync not implemented yet' });
});

// Sync activities from Garmin (placeholder)
router.post('/sync/garmin', auth, async (req, res) => {
  res.status(501).json({ message: 'Garmin sync not implemented yet' });
});

module.exports = router;