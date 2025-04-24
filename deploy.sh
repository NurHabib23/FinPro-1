#!/bin/bash

# LinkPro Deployment Script

echo "Starting LinkPro deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Run tests
echo "Running tests..."
npm test

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"
