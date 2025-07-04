#!/bin/bash
# Backend production deployment script for Realm of Darkness
# Exit on regular errors
set -e

# Navigate to backend directory
cd "$(dirname "$0")"
cd ..

echo "=========================================================="
echo "=     🐍 Realm of Darkness Backend Production 🐍        ="
echo "=========================================================="
echo

# Identify current user
CURRENT_USER=$(whoami)
PROJECT_PATH=$(pwd)
WEB_USER="web"  # The user that owns the files

# Check if this is a preproduction environment
cd ../..
if [ -f ".preproduction" ]; then
    ENVIRONMENT="preproduction"
    GUNICORN_SERVICE="gunicorn-preprod"
else
    ENVIRONMENT="production"
    GUNICORN_SERVICE="gunicorn"
fi
cd backend

# Function to run commands as web user
run_as_web() {
    if [ "$CURRENT_USER" = "$WEB_USER" ]; then
        # Already the web user
        eval "$@"
    else
        # Run as web user
        sudo -u "$WEB_USER" bash -c "$@"
    fi
}

# Application update steps (run as web user)
if [ "$1" != "--services-only" ]; then
    echo "[1/5] 🔧 Setting up Python virtual environment..."
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "      → Creating virtual environment..."
        run_as_web "cd $PROJECT_PATH && python3.12 -m venv venv"
        if [ $? -ne 0 ]; then
            echo "      ❌ Failed to create virtual environment!"
            exit 1
        fi
        echo "      ✅ Virtual environment created successfully."
    else
        echo "      ✅ Using existing virtual environment."
    fi
    
    VENV_PYTHON="venv/bin/python"
    if [ ! -f "$VENV_PYTHON" ]; then
        echo "      ❌ Could not find Python in virtual environment!"
        exit 1
    fi
    echo "      ✅ Virtual environment ready."
    
    echo "[2/5] 📦 Updating Python dependencies..."
    run_as_web "cd $PROJECT_PATH && $VENV_PYTHON -m pip install -r requirements.txt"
    echo "      ✅ Python dependencies updated successfully."
    
    echo "[3/5] 🗃️  Applying database migrations..."
    run_as_web "cd $PROJECT_PATH && $VENV_PYTHON manage.py migrate --no-input"
    echo "      ✅ Database schema up to date."
    
    # Create a touch file to indicate update is complete
    run_as_web "cd $PROJECT_PATH && touch .update_complete"
fi

# Service restart steps (need sudo)
echo "[4/5] 📋 Ensuring Redis is running..."
if ! systemctl is-active --quiet redis-server; then
    echo "      → Starting Redis..."
    if [ "$CURRENT_USER" != "root" ] && id -nG "$CURRENT_USER" | grep -qw "sudo"; then
        sudo systemctl start redis-server
    else
        echo "      ❌ Cannot start Redis - need sudo privileges!"
        echo "      → Please ask your system administrator to start Redis."
    fi
else
    echo "      ✅ Redis is already running."
fi

echo "[5/5] 🔄 Starting web services..."
if [ "$CURRENT_USER" != "root" ] && id -nG "$CURRENT_USER" | grep -qw "sudo"; then
    sudo systemctl daemon-reload
    sudo systemctl start $GUNICORN_SERVICE
    sudo systemctl enable $GUNICORN_SERVICE
    echo "      ✅ Web services started successfully."
else
    echo "      ⚠️  Cannot start services - sudo required."
    echo "      → Please ask your administrator to run: sudo systemctl start $GUNICORN_SERVICE"
    # Create a touch file to signal that restart is needed
    run_as_web "cd $PROJECT_PATH && touch .restart_needed"
fi

echo
echo "=========================================================="
echo "=      🐍 Backend deployment completed! 🐍              ="
echo "=========================================================="
echo