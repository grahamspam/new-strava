const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  externalId: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['strava', 'garmin', 'manual'],
    required: true
  },
  type: {
    type: String,
    enum: ['run', 'bike', 'swim', 'other'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,  // in seconds
    required: true
  },
  distance: {
    type: Number,  // in meters
    required: true
  },
  elevationGain: {
    type: Number,  // in meters
    default: 0
  },
  averageHeartRate: {
    type: Number,
    default: null
  },
  maxHeartRate: {
    type: Number,
    default: null
  },
  averagePace: {
    type: Number,  // in seconds per kilometer
    default: null
  },
  calories: {
    type: Number,
    default: null
  },
  perceivedEffort: {
    type: Number,  // 1-10 scale
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  weather: {
    temperature: Number,  // in Celsius
    humidity: Number,     // percentage
    windSpeed: Number,    // in km/h
    conditions: String    // e.g., "Sunny", "Rainy"
  },
  location: {
    startPoint: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],  // [longitude, latitude]
        default: [0, 0]
      }
    },
    endPoint: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],  // [longitude, latitude]
        default: [0, 0]
      }
    }
  },
  route: {
    type: String,  // URL to route data or name of route
    default: null
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

module.exports = mongoose.model('Activity', ActivitySchema);