const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  stravaId: {
    type: String,
    sparse: true
  },
  stravaToken: {
    accessToken: String,
    refreshToken: String,
    expiresAt: Date
  },
  garminId: {
    type: String,
    sparse: true
  },
  garminToken: {
    accessToken: String,
    refreshToken: String,
    expiresAt: Date
  },
  preferences: {
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    weekStart: {
      type: String,
      enum: ['monday', 'sunday'],
      default: 'monday'
    }
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

module.exports = mongoose.model('User', UserSchema);