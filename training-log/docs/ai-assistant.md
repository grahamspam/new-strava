# AI Assistant Documentation

This document outlines the design and implementation of the AI Assistant feature in Runner's Insight.

## Overview

The AI Assistant provides personalized training insights by analyzing the user's activity data, supplemental work, and wellness metrics. Unlike generic coaching apps that push notifications, this assistant responds to specific questions from the user, providing contextual advice based on their actual training patterns.

## User Experience

Users interact with the AI Assistant through a simple chat interface on the Insights page. They can:

1. Ask free-form questions about their training
2. Select from suggested question templates
3. View and reference previous conversations

## Technical Implementation

### Current Implementation (Placeholder)

The current implementation in the prototype uses mock responses based on predefined questions. This allows for UI testing and demonstration of the concept.

### Planned Implementation

The full implementation will involve:

1. **Data Processing Pipeline**:
   - Aggregating user's activity, supplemental work, and wellness data
   - Calculating relevant metrics (training load, fatigue, etc.)
   - Identifying patterns and correlations

2. **Natural Language Processing**:
   - Parsing user questions to understand intent
   - Extracting relevant time periods and metrics from questions
   - Formulating appropriate responses

3. **Integration with External AI Services**:
   - Using OpenAI's GPT or similar models for natural language understanding
   - Fine-tuning models on running and training-specific terminology
   - Implementing guardrails to ensure advice is safe and appropriate

## Example Questions and Responses

### Training Load and Recovery

**Question**: "Why have my easy runs felt sluggish lately?"

**Response Process**:
1. Analyze recent easy run pace vs. historical averages
2. Check sleep quality and duration trends
3. Assess weekly training load and compare to previous periods
4. Examine supplemental work frequency
5. Generate personalized response with specific observations and recommendations

### Injury Prevention

**Question**: "Is my hamstring tightness related to skipping mobility work?"

**Response Process**:
1. Analyze correlation between reported hamstring tightness and mobility sessions
2. Check for changes in running volume or intensity
3. Look for patterns in strength training that might affect hamstrings
4. Generate response with data-backed observations and specific recommendations

### Training Decisions

**Question**: "Should I do my planned workout tomorrow given my recent sleep?"

**Response Process**:
1. Analyze recent sleep metrics
2. Check training load and recovery metrics
3. Assess workout history and patterns
4. Generate response with specific recommendation and rationale

## Privacy and Data Usage

The AI Assistant only uses the user's own data to generate insights. No personal training data is shared between users or used to train the AI model beyond the individual user's account.

## Development Roadmap

### Phase 1: Basic Implementation
- Simple question parsing
- Predefined response templates
- Basic data analysis for common questions

### Phase 2: Enhanced Analysis
- More sophisticated pattern recognition
- Correlation analysis between different metrics
- Improved natural language understanding

### Phase 3: Advanced Features
- Proactive insights (optional)
- Training plan recommendations
- Integration with external health data sources

## Technical Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  User Interface │──────▶  API Endpoint   │──────▶  Data Processor │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └────────┬────────┘
                                                           │
                                                           ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│   Response      │◀─────│  NLP Engine     │◀─────│  Analysis       │
│   Formatter     │      │                 │      │  Engine         │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## Implementation Details

### API Endpoint

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
    "answer": "Based on your recent training data...",
    "relatedMetrics": [
      {
        "name": "Sleep Quality",
        "value": "6.2 hours/night",
        "trend": "decreasing",
        "impact": "high"
      },
      {
        "name": "Weekly Mileage",
        "value": "45 km",
        "trend": "increasing",
        "impact": "medium"
      }
    ]
  }
}
```

### Data Analysis Methods

The AI Assistant will use several analytical approaches:

1. **Time Series Analysis**: Detecting trends and changes over time
2. **Correlation Analysis**: Identifying relationships between different metrics
3. **Pattern Recognition**: Recognizing recurring patterns in training and recovery
4. **Anomaly Detection**: Identifying unusual values or patterns that may indicate issues

## Limitations and Considerations

- The AI Assistant is not a replacement for professional medical or coaching advice
- Quality of insights depends on the consistency and accuracy of user-entered data
- The system will acknowledge when it doesn't have enough data to provide meaningful insights
- All advice will be presented as suggestions rather than prescriptive instructions