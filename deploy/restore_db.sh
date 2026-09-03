#!/usr/bin/env bash
# ==============================================================================
# Regisbridge School Management System — Database Restoration Script
# Usage: ./restore_db.sh <regisbridge_web|regisbridge_django> <backup_file.sql.gz>
# ==============================================================================
set -euo pipefail

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <target_database_name> <path_to_backup.sql.gz>"
    echo "Example: $0 regisbridge_web /var/backups/regisbridge/regisbridge_web_20260903_120000.sql.gz"
    exit 1
fi

TARGET_DB="$1"
BACKUP_FILE="$2"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "[!] Error: Backup file '${BACKUP_FILE}' not found."
    exit 1
fi

if [ -f .env.production ]; then
    export $(grep -v '^#' .env.production | xargs)
fi

DB_USER="${POSTGRES_USER:-postgres}"

echo "[!] WARNING: You are about to restore '${BACKUP_FILE}' into database '${TARGET_DB}'."
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "Restoration cancelled."
    exit 0
fi

echo "[*] Restoring ${TARGET_DB}..."
gunzip -c "$BACKUP_FILE" | docker exec -i regisbridge_db psql -U "$DB_USER" -d "$TARGET_DB"

echo "[+] Restoration of ${TARGET_DB} completed successfully."
