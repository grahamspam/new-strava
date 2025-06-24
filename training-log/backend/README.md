# Runner's Insight Backend

The backend API server for Runner's Insight, a comprehensive training log for experienced runners.

## Features

- RESTful API for training data management
- Authentication and user management
- Integration with Strava and Garmin APIs
- Data analysis and insights generation

## Technology Stack

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Passport for OAuth integration

## Development

### Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=12000
MONGODB_URI=mongodb://localhost:27017/runners-insight
JWT_SECRET=your_jwt_secret_key_here
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_CALLBACK_URL=http://localhost:12000/api/auth/strava/callback
```

## API Endpoints

### Authentication

- `POST /api/auth/dev-login` - Development login
- `GET /api/auth/strava` - Initiate Strava OAuth
- `GET /api/auth/strava/callback` - Strava OAuth callback
- `GET /api/auth/garmin` - Initiate Garmin OAuth
- `GET /api/auth/garmin/callback` - Garmin OAuth callback

### Activities

- `GET /api/activities` - Get all activities
- `GET /api/activities/:id` - Get a single activity
- `POST /api/activities` - Create a new activity
- `PUT /api/activities/:id` - Update an activity
- `DELETE /api/activities/:id` - Delete an activity
- `POST /api/activities/sync/strava` - Sync activities from Strava

### Supplemental Work

- `GET /api/supplemental` - Get all supplemental work entries
- `GET /api/supplemental/:id` - Get a single supplemental work entry
- `POST /api/supplemental` - Create a new supplemental work entry
- `PUT /api/supplemental/:id` - Update a supplemental work entry
- `DELETE /api/supplemental/:id` - Delete a supplemental work entry

### Insights

- `GET /api/insights/summary` - Get training summary
- `GET /api/insights/correlations` - Get correlation analysis
- `POST /api/insights/ask` - Ask a question to the AI assistant