#!/bin/bash

# Production deployment script for Realm of Darkness
# This script handles git updates, dependencies, migrations, and service restarts

# Exit on any error
set -e

# Navigate to project root
cd "$(dirname "$0")"
cd ..

echo "===== Realm of Darkness Production Deployment ====="
echo

# Step 1: Pull latest changes from git
echo "[1/7] Updating from git repository..."
git pull

# Step 2: Set up virtual environment
echo "[2/7] Setting up Python virtual environment..."
# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "[X] Failed to create virtual environment!"
        exit 1
    fi
    echo "     - Virtual environment created successfully."
else
    echo "     - Using existing virtual environment."
fi

# Get Python executable in virtual environment
VENV_PYTHON="venv/bin/python"
if [ ! -f "$VENV_PYTHON" ]; then
    echo "[X] Could not find Python in virtual environment!"
    exit 1
fi
echo "     - Virtual environment ready."

# Step 3: Update Python dependencies
echo "[3/7] Updating Python dependencies..."
"$VENV_PYTHON" -m pip install -r requirements.txt

# Step 4: Update and build frontend
echo "[4/7] Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Step 5: Apply database migrations (but don't make them)
echo "[5/7] Applying database migrations..."
"$VENV_PYTHON" manage.py migrate --no-input

# Step 6: Ensure Redis is running
echo "[6/7] Ensuring Redis is running..."
if ! systemctl is-active --quiet redis-server; then
    echo "Starting Redis..."
    sudo systemctl start redis-server
else
    echo "Redis is already running"
fi

# Step 7: Update and restart Gunicorn
echo "[7/7] Updating and restarting web services..."
sudo systemctl daemon-reload
sudo systemctl restart gunicorn

echo
echo "✅ Deployment completed successfully!"
echo "■ Application is running at: https://realmofdarkness.app"
echo "■ Using Python virtual environment: ./venv"