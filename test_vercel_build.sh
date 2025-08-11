#!/bin/bash

set -e

echo "--- Starting Vercel Build Simulation Test ---"

# Clean up previous build artifacts
echo "Cleaning up previous build artifacts..."
rm -rf frontend/dist
rm -rf backend/node_modules
rm -rf node_modules # Clean root node_modules to ensure fresh install

# Run root npm install (should trigger postinstall for backend)
echo "Running npm install in root..."
npm install

# Run frontend build
echo "Running frontend build..."
npm run build:frontend

# Verify frontend build output
echo "Verifying frontend build output..."
if [ -d "frontend/dist" ]; then
  echo "frontend/dist directory found. Frontend build successful."
else
  echo "Error: frontend/dist directory not found. Frontend build failed."
  exit 1
fi

# Verify backend mongoose installation
echo "Verifying backend mongoose installation..."
if [ -d "backend/node_modules/mongoose" ]; then
  echo "backend/node_modules/mongoose found. Backend dependencies installed."
else
  echo "Error: backend/node_modules/mongoose not found. Backend dependencies failed to install."
  exit 1
fi

echo "--- Vercel Build Simulation Test Completed Successfully ---"
