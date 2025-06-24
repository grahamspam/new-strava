# Runner's Insight API Reference

This document provides details about the API endpoints available in the Runner's Insight application.

## Base URL

All API endpoints are prefixed with `/api`.

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Authentication Endpoints

#### Development Login

```
POST /api/auth/dev-login
```

Request body:
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### Strava OAuth (Planned)

```
GET /api/auth/strava
```

Redirects to Strava for authorization.

```
GET /api/auth/strava/callback
```

Callback endpoint for Strava OAuth.

## Activities

### Get All Activities

```
GET /api/activities
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "activity_id",
      "user": "user_id",
      "type": "run",
      "startDate": "2025-06-23T08:30:00Z",
      "endDate": "2025-06-23T09:15:00Z",
      "duration": 2700,
      "distance": 8500,
      "averagePace": 318,
      "notes": "Morning run, felt good"
    },
    {
      "_id": "activity_id_2",
      "user": "user_id",
      "type": "bike",
      "startDate": "2025-06-22T16:00:00Z",
      "endDate": "2025-06-22T17:00:00Z",
      "duration": 3600,
      "distance": 20000,
      "notes": "Easy recovery ride"
    }
  ]
}
```

### Get Single Activity

```
GET /api/activities/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "activity_id",
    "user": "user_id",
    "type": "run",
    "startDate": "2025-06-23T08:30:00Z",
    "endDate": "2025-06-23T09:15:00Z",
    "duration": 2700,
    "distance": 8500,
    "elevationGain": 120,
    "averageHeartRate": 145,
    "maxHeartRate": 165,
    "averagePace": 318,
    "calories": 650,
    "perceivedEffort": 6,
    "notes": "Morning run, felt good",
    "weather": {
      "temperature": 18,
      "humidity": 65,
      "windSpeed": 5,
      "conditions": "Partly Cloudy"
    },
    "location": {
      "startPoint": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      },
      "endPoint": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      }
    },
    "route": "Morning Loop",
    "createdAt": "2025-06-23T09:20:00Z",
    "updatedAt": "2025-06-23T09:20:00Z"
  }
}
```

### Create Activity

```
POST /api/activities
```

Request body:
```json
{
  "type": "run",
  "startDate": "2025-06-23T08:30:00Z",
  "endDate": "2025-06-23T09:15:00Z",
  "duration": 2700,
  "distance": 8500,
  "elevationGain": 120,
  "averageHeartRate": 145,
  "maxHeartRate": 165,
  "averagePace": 318,
  "calories": 650,
  "perceivedEffort": 6,
  "notes": "Morning run, felt good",
  "weather": {
    "temperature": 18,
    "humidity": 65,
    "windSpeed": 5,
    "conditions": "Partly Cloudy"
  },
  "location": {
    "startPoint": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749]
    },
    "endPoint": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749]
    }
  },
  "route": "Morning Loop"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "new_activity_id",
    "user": "user_id",
    "type": "run",
    "startDate": "2025-06-23T08:30:00Z",
    "endDate": "2025-06-23T09:15:00Z",
    "duration": 2700,
    "distance": 8500,
    "elevationGain": 120,
    "averageHeartRate": 145,
    "maxHeartRate": 165,
    "averagePace": 318,
    "calories": 650,
    "perceivedEffort": 6,
    "notes": "Morning run, felt good",
    "weather": {
      "temperature": 18,
      "humidity": 65,
      "windSpeed": 5,
      "conditions": "Partly Cloudy"
    },
    "location": {
      "startPoint": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      },
      "endPoint": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      }
    },
    "route": "Morning Loop",
    "createdAt": "2025-06-23T09:20:00Z",
    "updatedAt": "2025-06-23T09:20:00Z"
  }
}
```

### Update Activity

```
PUT /api/activities/:id
```

Request body: Same as create, with fields to update.

### Delete Activity

```
DELETE /api/activities/:id
```

Response:
```json
{
  "success": true,
  "data": {}
}
```

### Sync Activities from Strava (Planned)

```
POST /api/activities/sync/strava
```

## Supplemental Work

### Get All Supplemental Work

```
GET /api/supplemental
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "supplemental_id",
      "user": "user_id",
      "date": "2025-06-22T10:00:00Z",
      "type": "strength",
      "duration": 45,
      "focusAreas": ["lower-body", "core"],
      "perceivedEffort": 7,
      "exercises": [
        { "name": "Squats", "sets": 3, "reps": 12 },
        { "name": "Lunges", "sets": 3, "reps": 10 },
        { "name": "Planks", "sets": 3, "reps": 1 }
      ],
      "notes": "Good session"
    },
    {
      "_id": "supplemental_id_2",
      "user": "user_id",
      "date": "2025-06-20T18:00:00Z",
      "type": "mobility",
      "duration": 20,
      "focusAreas": ["hips", "hamstrings"],
      "perceivedEffort": 4,
      "notes": "Quick evening session"
    }
  ]
}
```

### Get Single Supplemental Work Entry

```
GET /api/supplemental/:id
```

### Create Supplemental Work Entry

```
POST /api/supplemental
```

Request body:
```json
{
  "date": "2025-06-22T10:00:00Z",
  "type": "strength",
  "duration": 45,
  "focusAreas": ["lower-body", "core"],
  "perceivedEffort": 7,
  "exercises": [
    { "name": "Squats", "sets": 3, "reps": 12 },
    { "name": "Lunges", "sets": 3, "reps": 10 },
    { "name": "Planks", "sets": 3, "reps": 1 }
  ],
  "notes": "Good session"
}
```

### Update Supplemental Work Entry

```
PUT /api/supplemental/:id
```

### Delete Supplemental Work Entry

```
DELETE /api/supplemental/:id
```

## Insights

### Get Training Summary

```
GET /api/insights/summary
```

Query parameters:
- `startDate`: Start date for the summary (YYYY-MM-DD)
- `endDate`: End date for the summary (YYYY-MM-DD)

Response:
```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2025-05-25",
      "end": "2025-06-24"
    },
    "running": {
      "totalRuns": 18,
      "totalDistance": 145000,
      "totalDuration": 46800,
      "averageDistance": 8055.56,
      "averageDuration": 2600
    },
    "supplemental": {
      "totalSessions": 12,
      "totalDuration": 360,
      "byType": {
        "strength": 5,
        "mobility": 3,
        "prehab": 2,
        "recovery": 2
      }
    }
  }
}
```

### Get Correlation Analysis (Planned)

```
GET /api/insights/correlations
```

### Ask AI Assistant

```
POST /api/insights/ask
```

Request body:
```json
{
  "question": "Why have my easy runs felt sluggish lately?"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "question": "Why have my easy runs felt sluggish lately?",
    "answer": "Based on your recent training data, your easy runs might feel sluggish due to a few factors:\n\n1. Your sleep quality has averaged only 6.2 hours over the past week, which is below your usual 7.5 hour average.\n\n2. You've increased your weekly mileage by 20% over the last two weeks, which may be causing accumulated fatigue.\n\n3. You've done less recovery work recently - only 1 recovery session in the past 10 days compared to your usual 2-3 sessions per week.\n\nConsider taking an extra rest day this week and prioritizing sleep and recovery work before your next key workout."
  }
}
```