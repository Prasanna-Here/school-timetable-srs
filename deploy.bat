@echo off
echo 🚀 School Time Table Deployment Setup
echo =====================================

REM Check if we're in the right directory
if not exist "netlify.toml" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📋 Deployment Checklist:
echo.

REM Check backend
echo 🔍 Checking backend...
if exist "backend" (
    echo ✅ Backend directory found
    
    REM Check if Maven wrapper exists
    if exist "backend\mvnw.cmd" (
        echo ✅ Maven wrapper found
    ) else (
        echo ❌ Maven wrapper not found
    )
    
    REM Check if application.properties exists
    if exist "backend\src\main\resources\application.properties" (
        echo ✅ Application properties found
    ) else (
        echo ❌ Application properties not found
    )
) else (
    echo ❌ Backend directory not found
)

echo.

REM Check frontend
echo 🔍 Checking frontend...
if exist "frontend" (
    echo ✅ Frontend directory found
    
    REM Check if package.json exists
    if exist "frontend\package.json" (
        echo ✅ Package.json found
    ) else (
        echo ❌ Package.json not found
    )
    
    REM Check if vite.config.js exists
    if exist "frontend\vite.config.js" (
        echo ✅ Vite config found
    ) else (
        echo ❌ Vite config not found
    )
) else (
    echo ❌ Frontend directory not found
)

echo.

REM Check Netlify configuration
echo 🔍 Checking Netlify configuration...
if exist "netlify.toml" (
    echo ✅ Netlify configuration found
    
    REM Check if placeholder URLs are still there
    findstr /C:"YOUR-BACKEND-URL" netlify.toml >nul
    if %errorlevel% == 0 (
        echo ⚠️  Warning: Please update the backend URL in netlify.toml
    ) else (
        echo ✅ Netlify configuration looks good
    )
) else (
    echo ❌ Netlify configuration not found
)

echo.
echo 📝 Next Steps:
echo 1. Update netlify.toml with your actual backend URL
echo 2. Set up your backend deployment (Heroku, Railway, etc.)
echo 3. Configure environment variables
echo 4. Deploy to Netlify
echo.
echo 🔧 Environment Variables to Set:
echo Backend:
echo   - DATABASE_URL
echo   - JWT_SECRET
echo   - CORS_ALLOWED_ORIGINS
echo.
echo Frontend (Netlify):
echo   - VITE_API_BASE_URL
echo.
echo ✨ Setup complete! Check the README.md for detailed instructions.
pause
