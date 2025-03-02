#!/bin/bash

# Development environment script for Realm of Darkness
# This script handles dependencies, migrations, and starts all services

# Exit on any error
set -e

# Navigate to project root
cd "$(dirname "$0")"
cd ..

echo "===== Realm of Darkness Development Environment ====="
echo

# Step 1: Update Python dependencies
echo "[1/6] Checking Python dependencies..."
pip install -r requirements.txt

# Step 2: Update frontend dependencies
echo "[2/6] Checking frontend dependencies..."
cd frontend
npm install
cd ..

# Step 3: Apply database migrations
echo "[3/6] Applying database migrations..."
python3 manage.py makemigrations
python3 manage.py migrate

# Step 4: Ensure Redis is running
echo "[4/6] Ensuring Redis is running..."
if command -v systemctl &> /dev/null && systemctl list-unit-files | grep -q redis; then
    # If systemd is available and redis is a known service
    if ! systemctl is-active --quiet redis-server; then
        echo "Starting Redis with systemd..."
        sudo systemctl start redis-server
    else
        echo "Redis is already running"
    fi
else
    # Otherwise try to start Redis directly
    echo "Starting Redis directly..."
    redis-server --daemonize yes || echo "Failed to start Redis. Please start it manually."
fi

# Step 5: Start Django development server
echo "[5/6] Starting Django server..."
# Use a separate terminal if available
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- python3 manage.py runserver 8080
elif command -v xterm &> /dev/null; then
    xterm -e "python3 manage.py runserver 8080" &
elif command -v konsole &> /dev/null; then
    konsole -e "python3 manage.py runserver 8080" &
else
    # If no terminal emulator is found, run in background
    echo "No terminal emulator found, running Django server in background..."
    python3 manage.py runserver 8080 &
    DJANGO_PID=$!
    echo "Django server started with PID: $DJANGO_PID"
fi

# Step 6: Start React development server
echo "[6/6] Starting React development server..."
# Use a separate terminal if available
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cd frontend && npm start"
elif command -v xterm &> /dev/null; then
    xterm -e "cd frontend && npm start" &
elif command -v konsole &> /dev/null; then
    konsole -e "cd frontend && npm start" &
else
    # If no terminal emulator is found, run in background
    echo "No terminal emulator found, running React dev server in background..."
    cd frontend && npm start &
    REACT_PID=$!
    echo "React server started with PID: $REACT_PID"
    cd ..
fi

echo
echo "✅ Development environment started successfully!"
echo "■ Redis Server: Running as a service"
echo "■ Django Server: http://localhost:8080"
echo "■ React Dev Server: http://localhost:3000"

echo
echo "Press Ctrl+C to stop all development processes."
# Keep script running to make it easy to stop all processes
trap "echo; echo Shutting down development environment...; kill $DJANGO_PID $REACT_PID 2>/dev/null" INT
read -r -d '' _ </dev/tty