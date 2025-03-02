#!/bin/bash
# Automated setup script for Linux/macOS

echo "=== Step 1/6: Installing Python dependencies ==="
cd ..
pip3 install -r requirements.txt || {
    echo "[ERROR] Failed to install Python packages!"
    exit 1
}

echo -e "\n=== Step 2/6: Building frontend ==="
cd frontend || {
    echo "[ERROR] Frontend directory not found!"
    exit 1
}

npm install || {
    echo "[ERROR] npm install failed!"
    exit 1
}

npm run build || {
    echo "[ERROR] npm build failed!"
    exit 1
}
cd ..

echo -e "\n=== Step 3/6: Creating database migrations ==="
python3 manage.py makemigrations || {
    echo "[ERROR] Failed to create migrations!"
    exit 1
}

echo -e "\n=== Step 4/6: Applying migrations ==="
python3 manage.py migrate || {
    echo "[ERROR] Failed to apply migrations!"
    exit 1
}

echo -e "\n=== Step 5/6: Loading initial data ==="
[ -f "haven/seed/morality.json" ] && python3 manage.py loaddata haven/seed/morality.json
[ -f "haven/seed/games-splats.json" ] && python3 manage.py loaddata haven/seed/games-splats.json

echo -e "\n=== Step 6/6: Starting services ==="
open_terminal "redis-server" "Redis Server"
sleep 2
open_terminal "python3 manage.py runserver 8080" "Django Server"

echo -e "\n✅ Setup completed successfully!"