#!/bin/bash

# Initialize git repository
git init

# Configure git user
git config user.name "openhands"
git config user.email "openhands@all-hands.dev"

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Project setup with frontend and backend"

echo "Git repository initialized and initial commit created."