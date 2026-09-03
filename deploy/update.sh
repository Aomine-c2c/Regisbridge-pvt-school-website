#!/usr/bin/env bash
# ==============================================================================
# Regisbridge School Management System — Zero-Downtime Update Script
# ==============================================================================
set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}       Regisbridge School Management System — Updating         ${NC}"
echo -e "${BLUE}================================================================${NC}"

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

if [ -d .git ]; then
    echo -e "${YELLOW}[*] Pulling latest updates from Git...${NC}"
    git pull origin main || echo "[!] Notice: Proceeding with existing local files."
fi

echo -e "${YELLOW}[*] Rebuilding and restarting containers...${NC}"
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

echo -e "${YELLOW}[*] Cleaning up dangling Docker images...${NC}"
docker image prune -f

echo -e "${YELLOW}[*] Updating host Nginx virtual host configuration...${NC}"
if [ -d /etc/nginx/sites-available ]; then
    cp deploy/regisbridge.conf /etc/nginx/sites-available/regisbridge.conf
    ln -sf /etc/nginx/sites-available/regisbridge.conf /etc/nginx/sites-enabled/regisbridge.conf
    nginx -t && systemctl reload nginx || true
fi

echo -e "${GREEN}[+] Update complete. Current status:${NC}"
docker compose -f docker-compose.prod.yml --env-file .env.production ps
