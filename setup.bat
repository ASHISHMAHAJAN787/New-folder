@echo off
echo ========================================
echo AI Learning Platform - Setup Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 18+ from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo Node.js version: 
node --version
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed!
    echo Please install Node.js (which includes npm)
    pause
    exit /b 1
)

echo npm version:
npm --version
echo.

echo Installing dependencies...
echo This may take a few minutes...
npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    echo Try running: npm cache clean --force
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete! 🎉
echo ========================================
echo.
echo To start the application, run:
echo   npm run dev
echo.
echo Then open your browser to: http://localhost:5173
echo.
echo Default admin login:
echo   Email: admin@learnai.com
echo   Password: admin123
echo.
pause