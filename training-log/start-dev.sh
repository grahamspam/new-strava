#!/bin/bash

# Start MongoDB (if installed)
if command -v mongod &> /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /tmp/mongodb.log
fi

# Start backend server
echo "Starting backend server..."
cd /workspace/training-log/backend
npm run dev &
BACKEND_PID=$!

# Start frontend server
echo "Starting frontend server..."
cd /workspace/training-log/frontend
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Register the cleanup function for when the script receives SIGINT
trap cleanup SIGINT

echo "Servers are running. Press Ctrl+C to stop."
echo "Backend: http://localhost:12000"
echo "Frontend: http://localhost:12001"

# Keep the script running
wait