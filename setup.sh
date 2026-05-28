#!/bin/bash

echo "========================================"
echo "AI Learning Platform - Setup Script"
echo "========================================"
echo ""

echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js 18+ from: https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "Node.js version: $(node --version)"
echo ""

echo "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed!"
    echo "Please install Node.js (which includes npm)"
    exit 1
fi

echo "npm version: $(npm --version)"
echo ""

echo "Installing dependencies..."
echo "This may take a few minutes..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies!"
    echo "Try running: npm cache clean --force"
    exit 1
fi

echo ""
echo "========================================"
echo "Setup Complete! 🎉"
echo "========================================"
echo ""
echo "To start the application, run:"
echo "  npm run dev"
echo ""
echo "Then open your browser to: http://localhost:5173"
echo ""
echo "Default admin login:"
echo "  Email: admin@learnai.com"
echo "  Password: admin123"
echo ""
echo "Press Ctrl+C to stop the server"