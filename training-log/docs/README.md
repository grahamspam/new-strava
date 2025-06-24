# Runner's Insight Documentation

This directory contains documentation for the Runner's Insight application.

## Contents

- [Getting Started](getting-started.md) - Setup and installation instructions
- [API Reference](api-reference.md) - Backend API endpoints and usage
- [Data Models](data-models.md) - Database schema and relationships
- [Frontend Components](frontend-components.md) - UI components and structure
- [AI Assistant](ai-assistant.md) - AI assistant feature design and implementation

## Project Overview

Runner's Insight is a comprehensive training log application for experienced runners who want data-driven insights without the gamification or social aspects of consumer fitness apps.

The application connects GPS activity data from services like Strava and Garmin with manual tracking of supplemental work (strength training, injury prevention, recovery) to provide a complete picture of training.

## Key Features

- Automatic import of run data from Strava/Garmin
- Simple logging of supplemental work (strength, mobility, recovery)
- Comprehensive dashboard with training patterns and insights
- On-demand AI assistant to answer specific training questions
- Correlation analysis between training variables and performance/injury risk

## Architecture

The application follows a client-server architecture:

- **Frontend**: React-based single-page application
- **Backend**: Node.js/Express RESTful API
- **Database**: MongoDB for data storage
- **External APIs**: Integration with Strava and Garmin

## Development Status

This project is currently in early development. The prototype demonstrates the core functionality and user interface, but some features (like Strava integration and the AI assistant) are implemented as placeholders.

## Contributing

To contribute to the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please follow the coding standards and documentation practices established in the codebase.