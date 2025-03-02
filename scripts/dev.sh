#!/bin/bash

# Development environment script for Realm of Darkness
# This script handles dependencies, migrations, and starts all services

# Navigate to project root
cd "$(dirname "$0")"
cd ..

echo "===== Realm of Darkness Development Environment ====="
echo

echo "[1/6] Checking Python dependencies..."
pip install -r requirements.txt --quiet
if [ $? -ne 0 ]; then
    echo "[X] Failed to install Python dependencies!"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "     - Dependencies updated successfully."

echo "[2/6] Checking frontend dependencies..."
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

echo "[3/6] Applying database migrations..."
python3 manage.py makemigrations --verbosity 0
python3 manage.py migrate --verbosity 0
echo "     - Database migration complete."

echo "[4/6] Starting Redis..."
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

echo "[5/6] Starting Django server..."
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
    $TERM_CMD python3 manage.py runserver 8080 &
else
    # Fall back to background process
    python3 manage.py runserver 8080 > django_server.log 2>&1 &
    DJANGO_PID=$!
    echo "     - Django server started in background (PID: $DJANGO_PID)"
fi
echo "     - Django server started successfully."

echo "[6/6] Starting React development server..."
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