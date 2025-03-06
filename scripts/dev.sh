#!/bin/bash

# Development environment script for Realm of Darkness
# This script handles dependencies, migrations, and starts all services

# Navigate to project root
cd "$(dirname "$0")"
cd ..

echo "===== Realm of Darkness Development Environment ====="
echo

echo "[1/7] Setting up Python virtual environment..."
# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "[X] Failed to create virtual environment!"
        read -p "Press Enter to exit..."
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
    read -p "Press Enter to exit..."
    exit 1
fi
echo "     - Virtual environment ready."

echo "[2/7] Checking Python dependencies..."
$VENV_PYTHON -m pip install -r requirements-dev.txt --quiet
if [ $? -ne 0 ]; then
    echo "[X] Failed to install Python dependencies!"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "     - Python dependencies updated successfully."

echo "[3/7] Checking frontend dependencies..."
cd frontend
npm install --silent
if [ $? -ne 0 ]; then
    echo "[X] Failed to install frontend dependencies!"
    cd ..
    read -p "Press Enter to exit..."
    exit 1
fi
echo "     - Frontend dependencies updated successfully."
cd ..

echo "[4/7] Applying database migrations..."
$VENV_PYTHON manage.py makemigrations --verbosity 0
$VENV_PYTHON manage.py migrate --verbosity 0
echo "     - Database migration complete."

echo "[5/7] Starting Redis..."
# Check for different ways to start Redis based on platform
if [ "$(uname)" == "Darwin" ]; then
    # macOS
    if command -v brew &> /dev/null && brew services list | grep -q redis; then
        brew services start redis
    else
        echo "[X] Redis not found via Homebrew. Please install Redis."
        read -p "Press Enter to exit..."
        exit 1
    fi
elif command -v systemctl &> /dev/null && systemctl list-unit-files | grep -q redis; then
    # Linux with systemd
    if ! systemctl is-active --quiet redis-server; then
        sudo systemctl start redis-server
    fi
else
    # Direct start attempt
    if command -v redis-server &> /dev/null; then
        redis-server --daemonize yes &> /dev/null
    else
        echo "[X] Redis not found! Please install Redis."
        read -p "Press Enter to exit..."
        exit 1
    fi
fi
echo "     - Redis server started successfully."

echo "[6/7] Starting Django server..."
# Try to identify the best terminal to use
TERM_CMD=""
if [ "$(uname)" == "Darwin" ]; then
    # macOS
    TERM_CMD="open -a Terminal"
elif command -v gnome-terminal &> /dev/null; then
    TERM_CMD="gnome-terminal --"
elif command -v xterm &> /dev/null; then
    TERM_CMD="xterm -e"
elif command -v konsole &> /dev/null; then
    TERM_CMD="konsole -e"
elif command -v terminal &> /dev/null; then
    TERM_CMD="terminal -e"
fi

# Start Django server
if [ -n "$TERM_CMD" ]; then
    $TERM_CMD $VENV_PYTHON manage.py runserver 8080 &
else
    # Fall back to background process
    $VENV_PYTHON manage.py runserver 8080 > django_server.log 2>&1 &
    DJANGO_PID=$!
    echo "     - Django server started in background (PID: $DJANGO_PID)"
fi
echo "     - Django server started successfully."

echo "[7/7] Starting React development server..."
# Start React development server
if [ -n "$TERM_CMD" ]; then
    $TERM_CMD bash -c "cd frontend && npm start" &
else
    # Fall back to background process
    cd frontend
    npm start > ../react_server.log 2>&1 &
    REACT_PID=$!
    cd ..
    echo "     - React server started in background (PID: $REACT_PID)"
fi
echo "     - React development server started successfully."

echo
echo "Development environment started successfully!"
echo
echo "* Python: Using virtual environment in ./venv"
echo "* Redis Server: Running in background (daemon mode)"
echo "* Django Server: http://localhost:8080"
echo "* React Dev Server: http://localhost:3000"
echo
echo "Press Ctrl+C to exit this window (services will continue running)..."

# If we're running background processes, save their PIDs to a file for later cleanup
if [ -n "$DJANGO_PID" ] || [ -n "$REACT_PID" ]; then
    echo "$DJANGO_PID $REACT_PID" > .dev_pids
fi

# Wait for user input
read -n 1