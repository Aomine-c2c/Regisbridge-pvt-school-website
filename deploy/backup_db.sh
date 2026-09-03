#!/usr/bin/env bash
# ==============================================================================
# Regisbridge School Management System — PostgreSQL Automated Backup Script
# Creates compressed dumps of both regisbridge_web and regisbridge_django
# ==============================================================================
set -euo pipefail

BACKUP_DIR="/var/backups/regisbridge"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=14

mkdir -p "$BACKUP_DIR"

# Source environment variables if present
if [ -f .env.production ]; then
    export $(grep -v '^#' .env.production | xargs)
fi

DB_USER="${POSTGRES_USER:-postgres}"

echo "[*] Starting Regisbridge database backup: ${TIMESTAMP}..."

# 1. Backup Next.js web database
WEB_BACKUP="${BACKUP_DIR}/regisbridge_web_${TIMESTAMP}.sql.gz"
echo "[*] Dumping regisbridge_web..."
docker exec -t regisbridge_db pg_dump -U "$DB_USER" regisbridge_web | gzip > "$WEB_BACKUP"
echo "[+] Saved: ${WEB_BACKUP} ($(du -sh "$WEB_BACKUP" | cut -f1))"

# 2. Backup Django tenant database
DJANGO_BACKUP="${BACKUP_DIR}/regisbridge_django_${TIMESTAMP}.sql.gz"
echo "[*] Dumping regisbridge_django..."
docker exec -t regisbridge_db pg_dump -U "$DB_USER" regisbridge_django | gzip > "$DJANGO_BACKUP"
echo "[+] Saved: ${DJANGO_BACKUP} ($(du -sh "$DJANGO_BACKUP" | cut -f1))"

# 3. Clean up backups older than RETENTION_DAYS
echo "[*] Cleaning up backups older than ${RETENTION_DAYS} days..."
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +${RETENTION_DAYS} -exec rm {} \;

echo "[+] Database backup completed successfully."
