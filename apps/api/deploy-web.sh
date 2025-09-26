#!/bin/bash

echo "🚀 Deploying web app to Netlify..."

# Build the web app
echo "📦 Building web app..."
cd apps/web
npm run build

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not found"
    exit 1
fi

echo "✅ Build completed successfully"
echo "📁 Built files:"
ls -la dist/

echo ""
echo "🌐 Next steps:"
echo "1. Go to your Netlify dashboard"
echo "2. Find your learnings.org site"
echo "3. Go to Site settings > Build & deploy > Deploy settings"
echo "4. Either:"
echo "   - Trigger a new deploy from Git (if connected)"
echo "   - Or drag and drop the 'dist' folder to deploy manually"
echo ""
echo "📂 The dist folder is located at: $(pwd)/dist"
