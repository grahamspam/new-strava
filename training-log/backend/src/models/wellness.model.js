const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WellnessSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  sleep: {
    duration: Number,  // in hours
    quality: Number,   // 1-10 scale
    notes: String
  },
  stress: {
    level: Number,     // 1-10 scale
    notes: String
  },
  fatigue: {
    level: Number,     // 1-10 scale
    notes: String
  },
  soreness: {
    level: Number,     // 1-10 scale
    locations: [String],
    notes: String
  },
  nutrition: {
    quality: Number,   // 1-10 scale
    hydration: Number, // 1-10 scale
    notes: String
  },
  readiness: {
    level: Number,     // 1-10 scale
    notes: String
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

module.exports = mongoose.model('Wellness', WellnessSchema);