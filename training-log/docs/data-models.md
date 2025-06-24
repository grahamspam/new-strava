# Data Models Documentation

This document describes the database models used in the Runner's Insight application.

## User Model

The User model stores information about application users, including their authentication details and preferences.

**Schema**: `/backend/src/models/user.model.js`

```javascript
{
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
  createdAt: Date,
  updatedAt: Date
}
```

## Activity Model

The Activity model stores running, cycling, and other cardio activities. It can be populated from Strava/Garmin or created manually.

**Schema**: `/backend/src/models/activity.model.js`

```javascript
{
  user: {
    type: ObjectId,
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
  createdAt: Date,
  updatedAt: Date
}
```

## Supplemental Model

The Supplemental model stores strength training, mobility work, and other supplemental activities that support running.

**Schema**: `/backend/src/models/supplemental.model.js`

```javascript
{
  user: {
    type: ObjectId,
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
  createdAt: Date,
  updatedAt: Date
}
```

## Wellness Model

The Wellness model tracks daily wellness metrics like sleep, stress, fatigue, and soreness.

**Schema**: `/backend/src/models/wellness.model.js`

```javascript
{
  user: {
    type: ObjectId,
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
  createdAt: Date,
  updatedAt: Date
}
```

## Relationships Between Models

- **User to Activity**: One-to-many. A user can have many activities.
- **User to Supplemental**: One-to-many. A user can have many supplemental work entries.
- **User to Wellness**: One-to-many. A user can have many wellness entries.

## Data Flow

1. User authenticates and receives a JWT token
2. Activities can be imported from Strava/Garmin or created manually
3. Supplemental work and wellness metrics are logged manually
4. The insights API combines data from all models to provide analysis and correlations

## Data Validation

All models include validation to ensure data integrity:

- Required fields must be present
- Enums restrict values to predefined options
- Date fields are properly formatted
- Numeric fields have appropriate ranges

## Future Model Enhancements

Planned enhancements to the data models include:

1. **Training Plans**: A model to store structured training plans
2. **Goals**: A model to track user-defined goals and progress
3. **Metrics**: A model to store custom metrics and benchmarks
4. **Gear**: A model to track running shoes and other equipment usage