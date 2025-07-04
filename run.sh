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

echo "[1/7] 📥 Updating from git repository..."
cd $PROJECT_PATH && git pull
echo "      ✅ Code updated successfully."

echo "[2/7] 🔐 Setting file permissions..."
echo "      → Setting permissions for backend and frontend (web user)..."
chown -R ":$WEB_USER" "$PROJECT_PATH/backend/" "$PROJECT_PATH/frontend/"
chmod -R 770 "$PROJECT_PATH/backend/" "$PROJECT_PATH/frontend/"
echo "      → Setting permissions for discord_bots (bot user)..."
chown -R ":$BOT_USER" "$PROJECT_PATH/discord_bots/"
chmod -R 770 "$PROJECT_PATH/discord_bots/"
echo "      ✅ File permissions updated."

echo "[3/7] 🛑 Stopping Discord bots..."
if [ "$ENVIRONMENT" = "preproduction" ]; then
    sudo -u "$BOT_USER" bash -c "cd $PROJECT_PATH/discord_bots && pm2 stop preprod-v5 preprod-v20 preprod-cod" || echo "      → Some bots were not running"
else
    sudo -u "$BOT_USER" bash -c "cd $PROJECT_PATH/discord_bots && pm2 stop v5 v20 cod" || echo "      → Some bots were not running"
fi
echo "      ✅ Discord bots stopped."

echo "[4/7] 🛑 Stopping web services..."
systemctl stop $GUNICORN_SERVICE || echo "      → $GUNICORN_SERVICE was not running"
echo "      ✅ Web services stopped."

echo "[5/7] ⚛️  Building frontend..."
cd "$PROJECT_PATH/frontend" && ./run.sh

echo "[6/7] 🐍 Deploying backend..."
cd "$PROJECT_PATH/backend/scripts" && ./run.sh

echo "[7/7] 🤖 Deploying and starting Discord bots..."
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
