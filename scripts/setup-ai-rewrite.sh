#!/bin/bash

echo "🤖 AI Definition Rewrite Setup"
echo "=============================="
echo ""

# Check if OpenAI API key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ OPENAI_API_KEY environment variable is not set"
    echo ""
    echo "To set it up:"
    echo "1. Get your API key from: https://platform.openai.com/api-keys"
    echo "2. Set the environment variable:"
    echo "   export OPENAI_API_KEY='your-api-key-here'"
    echo ""
    echo "Or run this script with the key:"
    echo "   OPENAI_API_KEY='your-key' node scripts/ai-rewrite-definitions.js"
    echo ""
    exit 1
fi

echo "✅ OPENAI_API_KEY is set"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies ready"
echo ""

echo "🚀 Ready to run AI definition rewrite!"
echo ""
echo "To start the process, run:"
echo "   node scripts/ai-rewrite-definitions.js"
echo ""
echo "This will:"
echo "  - Fetch all terms from the API"
echo "  - Process them in batches of 10"
echo "  - Use OpenAI to rewrite definitions"
echo "  - Generate a migration file"
echo "  - Create a detailed report"
echo ""
