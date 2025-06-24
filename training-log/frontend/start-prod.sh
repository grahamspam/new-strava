#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Install serve if not already installed
if ! command -v serve &> /dev/null; then
    echo "Installing serve..."
    npm install -g serve
fi

# Serve the built frontend
echo "Starting production server..."
serve -s dist -l 12001 --cors --no-clipboard