#!/bin/bash
# Root production deployment script for Realm of Darkness
# Must be run as root: sudo ./run.sh
# Exit on regular errors
set -e

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root!"
    echo "   Usage: sudo ./run.sh"
    exit 1
fi

# Navigate to project root
cd "$(dirname "$0")"

echo "=========================================================="
echo "=  🚀 Realm of Darkness Full Production Deployment 🚀   ="
echo "=========================================================="
echo

PROJECT_PATH=$(pwd)
WEB_USER="web"  # The user that runs the Frontend & Backend
BOT_USER="bot"  # The user that runs the Discord bots

# Check if this is a preproduction environment
if [ -f ".preproduction" ]; then
    ENVIRONMENT="preproduction"
    GUNICORN_SERVICE="gunicorn-preprod"
    echo "🧪 Running in PREPRODUCTION mode"
else
    ENVIRONMENT="production"
    GUNICORN_SERVICE="gunicorn"
    echo "🚀 Running in PRODUCTION mode"
fi

echo "[1/6] 📥 Updating from git repository..."
cd $PROJECT_PATH && git pull
echo "      ✅ Code updated successfully."

echo "[2/6] 🛑 Stopping Discord bots..."
if [ "$ENVIRONMENT" = "preproduction" ]; then
    sudo -u "$BOT_USER" bash -c "cd $PROJECT_PATH/discord_bots && pm2 stop preprod-v5 preprod-v20 preprod-cod" || echo "      → Some bots were not running"
else
    sudo -u "$BOT_USER" bash -c "cd $PROJECT_PATH/discord_bots && pm2 stop v5 v20 cod" || echo "      → Some bots were not running"
fi
echo "      ✅ Discord bots stopped."

echo "[3/6] 🛑 Stopping web services..."
systemctl stop $GUNICORN_SERVICE || echo "      → $GUNICORN_SERVICE was not running"
echo "      ✅ Web services stopped."

echo "[4/6] ⚛️  Building frontend..."
cd "$PROJECT_PATH/frontend" && ./run.sh

echo "[5/6] 🐍 Deploying backend..."
cd "$PROJECT_PATH/backend/scripts" && ./run.sh

echo "[6/6] 🤖 Deploying and starting Discord bots..."
cd "$PROJECT_PATH/discord_bots/scripts" && ./run.sh

echo
echo "=========================================================="
echo "=      ✅ Full deployment completed successfully! ✅     ="
echo "=========================================================="
echo
echo "🌐 Web Application: https://realmofdarkness.app"
echo "🐍 Python Backend:  ./backend/ (virtual env: backend/venv)"
echo "⚛️  React Frontend:  ./frontend/"
echo "🤖 Discord Bots:    ./discord_bots/"
echo
echo "🔎 Monitor Discord bots: pm2 status"
echo "📋 View bot logs:        pm2 logs [v5|v20|cod]"
echo
