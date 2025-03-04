@echo off
setlocal EnableDelayedExpansion
cd /d %~dp0
cd..

echo ===== Realm of Darkness Development Environment =====
echo.

echo [1/6] Checking Python dependencies...
pip install -r requirements.txt --quiet
if %ERRORLEVEL% neq 0 (
    echo [X] Failed to install Python dependencies!
    pause
    exit /b 1
)
echo      - Dependencies updated successfully.

echo [2/6] Checking frontend dependencies...
cd frontend
call npm install --silent
if %ERRORLEVEL% neq 0 (
    echo [X] Failed to install frontend dependencies!
    cd ..
    pause
    exit /b 1
)
cd ..
echo      - Frontend dependencies updated successfully.

echo [3/6] Applying database migrations...
py manage.py makemigrations
py manage.py migrate
echo      - Database migration complete.

echo [4/6] Starting Redis in WSL...
where wsl >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [X] WSL not found! Redis cannot be started.
    echo [X] Please install WSL to run Redis, or install Redis directly.
    pause
    exit /b 1
)

REM Use WSL with daemon mode and redirect output to nul to prevent window from showing
wsl -e redis-server --daemonize yes > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [X] Failed to start Redis server.
    pause
    exit /b 1
)
echo      - Redis server started successfully.

echo [5/6] Starting Django server...
start "Django Server" cmd /k py manage.py runserver 8080
echo      - Django server started successfully.

echo [6/6] Starting React development server...
start "React Dev Server" cmd /k "cd frontend && npm start"
echo      - React development server started successfully.

echo.
echo Development environment started successfully!
echo.
echo * Redis Server: Running in background (daemon mode)
echo * Django Server: http://localhost:8080
echo * React Dev Server: http://localhost:3000
echo.
echo Press any key to close this window (services will continue running)...
pause >nul