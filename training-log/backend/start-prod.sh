#!/bin/bash

# Set environment variables for production
export NODE_ENV=production
export PORT=12000
export MONGODB_URI=mongodb://localhost:27017/runners-insight
export JWT_SECRET=production_secret_key_change_this_in_real_deployment

# Start the server
echo "Starting backend server in production mode..."
node src/server.js