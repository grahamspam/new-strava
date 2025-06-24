# Getting Started with Runner's Insight

This guide will help you set up and run the Runner's Insight application for local development.

## Prerequisites

- Node.js (v16+)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies for both backend and frontend

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:

```
PORT=12000
MONGODB_URI=mongodb://localhost:27017/runners-insight
JWT_SECRET=your_jwt_secret_key_here
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_CALLBACK_URL=http://localhost:12000/api/auth/strava/callback
```

2. For Strava integration, you'll need to:
   - Create a Strava API application at https://www.strava.com/settings/api
   - Set the callback URL to match your STRAVA_CALLBACK_URL
   - Add the client ID and secret to your .env file

## Running the Application

You can start both the backend and frontend servers using the provided script:

```bash
./start-dev.sh
```

Or start them individually:

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## Development Login

Since this is a development version, you can use the development login endpoint:

1. Navigate to http://localhost:12001
2. Enter any email and name to log in
3. The system will create a new user account if one doesn't exist

## Project Structure

```
training-log/
├── backend/             # Node.js/Express API server
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utility functions
│   └── server.js        # Main server file
├── frontend/            # React frontend
│   ├── public/          # Static files
│   └── src/
│       ├── assets/      # Images, fonts, etc.
│       ├── components/  # Reusable components
│       ├── context/     # React context
│       ├── hooks/       # Custom hooks
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── utils/       # Utility functions
└── docs/                # Documentation
```

## Available Features

- User authentication (development mode)
- Activity tracking and management
- Supplemental work logging
- Training insights and analysis
- AI assistant for training questions

## Planned Features

- Strava and Garmin integration
- Advanced correlation analysis
- Training plan recommendations
- Mobile app version