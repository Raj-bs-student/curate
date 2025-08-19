#!/bin/bash

set -e

echo "--- Starting Vercel Build Simulation Test ---"

# Clean up previous build artifacts
echo "Cleaning up previous build artifacts..."
rm -rf frontend/dist
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf api/node_modules

# Install all dependencies
echo "Installing all dependencies..."
npm run install:all

# Build the frontend
echo "Building the frontend..."
npm run build:frontend

# Verify frontend build output
echo "Verifying frontend build output..."
if [ -d "frontend/dist" ]; then
  echo "frontend/dist directory found. Frontend build successful."
else
  echo "Error: frontend/dist directory not found. Frontend build failed."
  exit 1
fi

# Verify backend dependencies installation
echo "Verifying backend dependencies installation..."
if [ -d "api/node_modules/express" ]; then
  echo "api/node_modules/express found. Backend dependencies installed."
else
  echo "Error: api/node_modules/express not found. Backend dependencies failed to install."
  exit 1
fi

# Clean up node_modules to avoid sandbox error
echo "Cleaning up node_modules..."
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf api/node_modules

echo "--- Vercel Build Simulation Test Completed Successfully ---"
