#!/bin/bash

# Update package list
apt-get update

# Install MongoDB
apt-get install -y mongodb

# Create data directory if it doesn't exist
mkdir -p /data/db

# Start MongoDB service
service mongodb start

# Check if MongoDB is running
if pgrep -x "mongod" > /dev/null
then
    echo "MongoDB installed and running successfully"
else
    echo "MongoDB installation failed or service not running"
fi