# Runner's Insight - Smart Training Log

A comprehensive training log application for experienced runners who want data-driven insights without the gamification or social aspects of consumer fitness apps.

## Project Overview

Runner's Insight connects your GPS activity data from services like Strava and Garmin with manual tracking of supplemental work (strength training, injury prevention, recovery) to provide a complete picture of your training. The application offers:

- Automatic import of run data from Strava/Garmin
- Simple logging of supplemental work (strength, mobility, recovery)
- Comprehensive dashboard with training patterns and insights
- On-demand AI assistant to answer specific training questions
- Correlation analysis between training variables and performance/injury risk

## Target Users

- Former collegiate athletes now focused on staying fit
- Masters runners
- Experienced runners who understand training concepts
- Anyone who takes training seriously but needs information rather than motivation

## Technology Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Passport for OAuth integration

### Frontend
- React with Vite
- Material UI for components
- Recharts for data visualization
- React Router for navigation

## Getting Started

See the [Getting Started Guide](docs/getting-started.md) for detailed setup instructions.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/runners-insight.git
cd runners-insight

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start development servers
cd .. && ./start-dev.sh
```

## Documentation

- [API Reference](docs/api-reference.md)
- [Data Models](docs/data-models.md)
- [Frontend Components](docs/frontend-components.md)
- [AI Assistant](docs/ai-assistant.md)

## Development Status

This project is currently in early development. The prototype demonstrates the core functionality and user interface, but some features (like Strava integration and the AI assistant) are implemented as placeholders.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.