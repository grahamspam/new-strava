const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplementalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['strength', 'mobility', 'prehab', 'rehab', 'recovery', 'cross-training', 'other'],
    required: true
  },
  duration: {
    type: Number,  // in minutes
    required: true
  },
  focusAreas: [{
    type: String,
    enum: ['core', 'upper-body', 'lower-body', 'full-body', 'hamstrings', 'quads', 'calves', 'glutes', 'hips', 'back', 'shoulders', 'ankles', 'feet', 'other']
  }],
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    notes: String
  }],
  perceivedEffort: {
    type: Number,  // 1-10 scale
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplemental', SupplementalSchema);