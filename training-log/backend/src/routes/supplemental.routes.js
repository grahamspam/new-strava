const express = require('express');
const router = express.Router();
const Supplemental = require('../models/supplemental.model');
const auth = require('../middleware/auth.middleware');

// Get all supplemental work entries for a user
router.get('/', auth, async (req, res) => {
  try {
    const supplementals = await Supplemental.find({ user: req.user.id })
      .sort({ date: -1 });
    
    res.status(200).json({
      success: true,
      count: supplementals.length,
      data: supplementals
    });
  } catch (error) {
    console.error('Error fetching supplemental work:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplemental work',
      error: error.message
    });
  }
});

// Get a single supplemental work entry
router.get('/:id', auth, async (req, res) => {
  try {
    const supplemental = await Supplemental.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!supplemental) {
      return res.status(404).json({
        success: false,
        message: 'Supplemental work entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: supplemental
    });
  } catch (error) {
    console.error('Error fetching supplemental work entry:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplemental work entry',
      error: error.message
    });
  }
});

// Create a new supplemental work entry
router.post('/', auth, async (req, res) => {
  try {
    const newSupplemental = new Supplemental({
      ...req.body,
      user: req.user.id
    });
    
    await newSupplemental.save();
    
    res.status(201).json({
      success: true,
      data: newSupplemental
    });
  } catch (error) {
    console.error('Error creating supplemental work entry:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating supplemental work entry',
      error: error.message
    });
  }
});

// Update a supplemental work entry
router.put('/:id', auth, async (req, res) => {
  try {
    const supplemental = await Supplemental.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!supplemental) {
      return res.status(404).json({
        success: false,
        message: 'Supplemental work entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: supplemental
    });
  } catch (error) {
    console.error('Error updating supplemental work entry:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating supplemental work entry',
      error: error.message
    });
  }
});

// Delete a supplemental work entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const supplemental = await Supplemental.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!supplemental) {
      return res.status(404).json({
        success: false,
        message: 'Supplemental work entry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting supplemental work entry:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting supplemental work entry',
      error: error.message
    });
  }
});

module.exports = router;