#!/bin/bash

# LinkPro Deployment Script

echo "Starting deployment preparation..."

# Find any imports of next/headers in the pages directory
echo "Checking for next/headers imports in pages directory..."
HEADERS_IMPORTS=$(grep -r "next/headers" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" pages/ 2>/dev/null || echo "No imports found")

if [ -n "$HEADERS_IMPORTS" ]; then
  echo "Found next/headers imports in pages directory:"
  echo "$HEADERS_IMPORTS"
  echo "These need to be fixed before deployment."
  exit 1
fi

# Check for other App Router features in Pages Router
echo "Checking for other App Router features in pages directory..."
APP_FEATURES=$(grep -r "use server\|next/navigation" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" pages/ 2>/dev/null || echo "No imports found")

if [ -n "$APP_FEATURES" ]; then
  echo "Found App Router features in Pages directory:"
  echo "$APP_FEATURES"
  echo "These need to be fixed before deployment."
  exit 1
fi

echo "All checks passed. Ready for deployment."

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
