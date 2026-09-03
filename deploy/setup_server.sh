#!/usr/bin/env bash
# ==============================================================================
# Regisbridge School Management System — Master Server Bootstrap Script
# Target OS: Ubuntu / Debian Linux Host
# ==============================================================================
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}   Regisbridge School Management System — Production Setup     ${NC}"
echo -e "${BLUE}================================================================${NC}"

# 1. Root / Sudo Check
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}[!] Please run this script with sudo or as root.${NC}"
    exit 1
fi

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"
echo -e "${GREEN}[+] Working in project directory: ${PROJECT_DIR}${NC}"

# 2. Check and Install Docker if Missing
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}[*] Docker not found. Installing official Docker engine...${NC}"
    apt-get update
    apt-get install -y ca-certificates curl gnupg lsb-release
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    systemctl enable --now docker
    echo -e "${GREEN}[+] Docker installed successfully.${NC}"
else
    echo -e "${GREEN}[+] Docker is already installed: $(docker --version)${NC}"
fi

# 3. Setup Unix Domain Socket Directory
SOCKET_DIR="/run/regisbridge"
echo -e "${YELLOW}[*] Preparing Unix socket directory at ${SOCKET_DIR}...${NC}"
mkdir -p "$SOCKET_DIR"
chown -R www-data:www-data "$SOCKET_DIR" 2>/dev/null || chmod -R 777 "$SOCKET_DIR"
chmod 777 "$SOCKET_DIR"
echo -e "${GREEN}[+] Socket directory ready.${NC}"

# 4. Setup Backups Directory
mkdir -p /var/backups/regisbridge
chmod 700 /var/backups/regisbridge

# 5. Prepare .env.production with Secure Generated Secrets if Missing
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}[*] .env.production not found. Generating from example with secure cryptographic secrets...${NC}"
    cp .env.production.example .env.production

    RAND_DB_PASS=$(openssl rand -hex 16)
    RAND_JWT_SECRET=$(openssl rand -base64 48 | tr -d '\n')
    RAND_JWT_REFRESH=$(openssl rand -base64 48 | tr -d '\n')
    RAND_NEXTAUTH=$(openssl rand -base64 48 | tr -d '\n')
    RAND_DJANGO_SECRET=$(openssl rand -base64 48 | tr -d '\n')

    sed -i "s|replace_with_a_secure_random_db_password_here|${RAND_DB_PASS}|g" .env.production
    sed -i "s|replace_with_64_char_secret_for_jwt_auth_tokens_1234567890abcdef|${RAND_JWT_SECRET}|g" .env.production
    sed -i "s|replace_with_64_char_secret_for_jwt_refresh_tokens_1234567890abcdef|${RAND_JWT_REFRESH}|g" .env.production
    sed -i "s|replace_with_64_char_secret_for_nextauth_sessions_1234567890abcdef|${RAND_NEXTAUTH}|g" .env.production
    sed -i "s|replace_with_random_django_secret_key_1234567890abcdefghijklmnopqrstuv|${RAND_DJANGO_SECRET}|g" .env.production

    echo -e "${GREEN}[+] .env.production generated with new secure random secrets.${NC}"
else
    echo -e "${GREEN}[+] Existing .env.production detected.${NC}"
fi

# 6. Build and Launch Containers
echo -e "${YELLOW}[*] Building and starting Regisbridge containers...${NC}"
docker compose -f docker-compose.prod.yml --env-file .env.production down || true
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

echo -e "${GREEN}[+] Containers started successfully.${NC}"
docker compose -f docker-compose.prod.yml ps

# 7. Configure Host Nginx
if [ -d /etc/nginx/sites-available ]; then
    echo -e "${YELLOW}[*] Configuring host Nginx virtual host...${NC}"
    cp deploy/regisbridge.conf /etc/nginx/sites-available/regisbridge.conf
    if [ ! -f /etc/nginx/sites-enabled/regisbridge.conf ]; then
        ln -s /etc/nginx/sites-available/regisbridge.conf /etc/nginx/sites-enabled/regisbridge.conf
    fi

    if nginx -t; then
        systemctl reload nginx
        echo -e "${GREEN}[+] Host Nginx configured and reloaded successfully.${NC}"
    else
        echo -e "${RED}[!] Host Nginx syntax check failed. Please check /etc/nginx/sites-available/regisbridge.conf${NC}"
    fi
else
    echo -e "${YELLOW}[!] Host directory /etc/nginx/sites-available not found. Please install or configure host Nginx manually.${NC}"
fi

echo -e "${BLUE}================================================================${NC}"
echo -e "${GREEN}   Setup Complete! Regisbridge is running via Unix Socket.     ${NC}"
echo -e "${BLUE}================================================================${NC}"
echo -e "Next steps:"
echo -e "1. Check container status: ${YELLOW}docker compose -f docker-compose.prod.yml ps${NC}"
echo -e "2. View live logs:        ${YELLOW}docker compose -f docker-compose.prod.yml logs -f${NC}"
echo -e "3. Install SSL via Certbot: ${YELLOW}certbot --nginx -d your-domain.com${NC}"
echo -e "${BLUE}================================================================${NC}"
