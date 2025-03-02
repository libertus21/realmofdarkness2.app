@echo off

:: Setup environment
cd /d %~dp0

echo [1/7] Installing Python packages...

:: 1. Install Python dependencies
pip install -r requirements.txt || (
    echo [X] Error installing Python dependencies!
    pause
    exit /b 1
)
cd..
pushd frontend
:: Build frontend
echo [2/7] Building frontend...
call npm install || (
    echo [X] npm install failed!
    popd
    pause
    exit /b 1
)

echo === Running npm run build...
call npm run build || (
    echo [X] npm run build failed!
    popd
    pause
    exit /b 1
)
popd
:: Database setup
echo [3/7] Creating migrations...
call py manage.py makemigrations || (
    echo [X] Error during makemigrations!
    pause
    exit /b 1
)

:: 4. Apply migrations
echo [4/7] Applying migrations...
call py manage.py migrate || (
    echo [X] Error during migrate!
    pause
    exit /b 1
)

:: 5. Load initial data
echo [5/7] Loading initial data...
if exist "haven\seed\morality.json" (
    call py manage.py loaddata haven\seed\morality.json
)
if exist "haven\seed\games-splats.json" (
    call py manage.py loaddata haven\seed\games-splats.json
)

:: 6. Start Redis in WSL (persistent window)
echo [6/7] Starting Redis in WSL...
start "Redis Server" cmd /k "wsl -e bash -c "redis-server; echo; echo Press any key to close... && read""

:: 7. Start Django (persistent window)
echo [7/7] Starting Django server...
start "Django Server" cmd /k "py manage.py runserver 8080 && pause"

echo ✅ Setup completed successfully!
echo.
echo ■ Redis Server: Running in WSL
echo ■ Django Server: http://localhost:8080