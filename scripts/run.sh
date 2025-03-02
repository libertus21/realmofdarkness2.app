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
echo "[1/6] Updating from git repository..."
git pull

# Step 2: Update Python dependencies
echo "[2/6] Updating Python dependencies..."
pip install -r requirements.txt

# Step 3: Update and build frontend
echo "[3/6] Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Step 4: Apply any database migrations
echo "[4/6] Applying database migrations..."
python3 manage.py makemigrations
python3 manage.py migrate

# Step 5: Ensure Redis is running
echo "[5/6] Ensuring Redis is running..."
if ! systemctl is-active --quiet redis-server; then
    echo "Starting Redis..."
    sudo systemctl start redis-server
else
    echo "Redis is already running"
fi

# Step 6: Restart Gunicorn
echo "[6/6] Restarting web services..."
sudo systemctl daemon-reload
sudo systemctl restart gunicorn

echo
echo "✅ Deployment completed successfully!"
echo "■ Application is running at: https://realmofdarkness.app"