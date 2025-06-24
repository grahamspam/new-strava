# Frontend Components Documentation

This document provides an overview of the key components in the Runner's Insight frontend application.

## Page Components

### Dashboard

The Dashboard is the main landing page after login. It displays:

- Summary statistics for running and supplemental work
- Weekly distance chart
- Supplemental work distribution by type
- Quick action buttons for logging activities

**File**: `/frontend/src/pages/Dashboard.jsx`

### Activities

The Activities page displays a table of all running and other cardio activities. Features include:

- Filtering and sorting activities
- Adding new activities
- Editing existing activities
- Syncing with Strava (planned)
- Detailed activity view

**File**: `/frontend/src/pages/Activities.jsx`

### Supplemental Work

The Supplemental Work page manages all strength, mobility, and recovery sessions. Features include:

- Summary cards by workout type
- Table of all supplemental work entries
- Adding new entries
- Editing existing entries

**File**: `/frontend/src/pages/Supplemental.jsx`

### Insights

The Insights page provides analysis and AI assistance. Features include:

- AI assistant for answering training questions
- Training volume analysis charts
- Correlation analysis between different training variables
- Running intensity distribution

**File**: `/frontend/src/pages/Insights.jsx`

### Login

The Login page handles user authentication. In development mode, it allows login with any email and name.

**File**: `/frontend/src/pages/Login.jsx`

## Reusable Components

### Navbar

The Navbar provides navigation between different sections of the application. It's responsive and collapses to a drawer menu on mobile devices.

**File**: `/frontend/src/components/Navbar.jsx`

### ProtectedRoute

The ProtectedRoute component ensures that only authenticated users can access certain routes. It redirects unauthenticated users to the login page.

**File**: `/frontend/src/components/ProtectedRoute.jsx`

## Context Providers

### AuthContext

The AuthContext provides authentication state and methods throughout the application. It handles:

- User login/logout
- Storing authentication tokens
- Checking authentication status

**File**: `/frontend/src/context/AuthContext.jsx`

## Custom Hooks

### useAuth

The useAuth hook provides easy access to the AuthContext. It's used in components that need to check authentication status or perform auth-related actions.

**File**: `/frontend/src/hooks/useAuth.js`

## Services

### API Service

The API service handles all communication with the backend API. It provides methods for:

- Authentication
- CRUD operations for activities
- CRUD operations for supplemental work
- Fetching insights and analysis

**File**: `/frontend/src/services/api.js`

## Styling

The application uses Material UI for styling and components. The theme is defined in the App component.

**File**: `/frontend/src/App.jsx`

## Data Visualization

Charts and graphs are implemented using Recharts, a composable charting library for React. Examples include:

- Line charts for training volume over time
- Bar charts for supplemental work by type
- Pie charts for running intensity distribution

## Responsive Design

The application is designed to work on both desktop and mobile devices. Key responsive features include:

- Collapsible navigation menu
- Responsive grid layouts
- Adaptable tables that work on smaller screens