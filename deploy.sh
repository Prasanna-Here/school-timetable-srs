#!/bin/bash

# School Time Table - Deployment Script
# This script helps set up the application for deployment

echo "🚀 School Time Table Deployment Setup"
echo "====================================="

# Check if we're in the right directory
if [ ! -f "netlify.toml" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Deployment Checklist:"
echo ""

# Check backend
echo "🔍 Checking backend..."
if [ -d "backend" ]; then
    echo "✅ Backend directory found"
    
    # Check if Maven wrapper exists
    if [ -f "backend/mvnw" ]; then
        echo "✅ Maven wrapper found"
    else
        echo "❌ Maven wrapper not found"
    fi
    
    # Check if application.properties exists
    if [ -f "backend/src/main/resources/application.properties" ]; then
        echo "✅ Application properties found"
    else
        echo "❌ Application properties not found"
    fi
else
    echo "❌ Backend directory not found"
fi

echo ""

# Check frontend
echo "🔍 Checking frontend..."
if [ -d "frontend" ]; then
    echo "✅ Frontend directory found"
    
    # Check if package.json exists
    if [ -f "frontend/package.json" ]; then
        echo "✅ Package.json found"
    else
        echo "❌ Package.json not found"
    fi
    
    # Check if vite.config.js exists
    if [ -f "frontend/vite.config.js" ]; then
        echo "✅ Vite config found"
    else
        echo "❌ Vite config not found"
    fi
else
    echo "❌ Frontend directory not found"
fi

echo ""

# Check Netlify configuration
echo "🔍 Checking Netlify configuration..."
if [ -f "netlify.toml" ]; then
    echo "✅ Netlify configuration found"
    
    # Check if placeholder URLs are still there
    if grep -q "YOUR-BACKEND-URL" netlify.toml; then
        echo "⚠️  Warning: Please update the backend URL in netlify.toml"
    else
        echo "✅ Netlify configuration looks good"
    fi
else
    echo "❌ Netlify configuration not found"
fi

echo ""

echo "📝 Next Steps:"
echo "1. Update netlify.toml with your actual backend URL"
echo "2. Set up your backend deployment (Heroku, Railway, etc.)"
echo "3. Configure environment variables"
echo "4. Deploy to Netlify"
echo ""

echo "🔧 Environment Variables to Set:"
echo "Backend:"
echo "  - DATABASE_URL"
echo "  - JWT_SECRET"
echo "  - CORS_ALLOWED_ORIGINS"
echo ""
echo "Frontend (Netlify):"
echo "  - VITE_API_BASE_URL"
echo ""

echo "✨ Setup complete! Check the README.md for detailed instructions."
