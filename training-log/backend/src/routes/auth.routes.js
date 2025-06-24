const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Mock authentication for development
router.post('/dev-login', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({
        email,
        name
      });
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
      error: error.message
    });
  }
});

// Strava OAuth routes (to be implemented)
router.get('/strava', (req, res) => {
  res.status(501).json({ message: 'Strava OAuth not implemented yet' });
});

router.get('/strava/callback', (req, res) => {
  res.status(501).json({ message: 'Strava OAuth callback not implemented yet' });
});

// Garmin OAuth routes (to be implemented)
router.get('/garmin', (req, res) => {
  res.status(501).json({ message: 'Garmin OAuth not implemented yet' });
});

router.get('/garmin/callback', (req, res) => {
  res.status(501).json({ message: 'Garmin OAuth callback not implemented yet' });
});

module.exports = router;