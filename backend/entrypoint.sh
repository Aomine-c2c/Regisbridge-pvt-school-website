#!/bin/sh
set -e

echo "[*] Starting Regisbridge Backend Service..."

# Wait for PostgreSQL
DB_HOST="${DJANGO_DB_HOST:-db}"
DB_PORT="${DJANGO_DB_PORT:-5432}"

echo "[*] Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "[+] PostgreSQL is available."

# Run shared migrations
echo "[*] Applying shared migrations..."
python manage.py migrate_schemas --shared --noinput

# Bootstrap default tenants and superuser
echo "[*] Ensuring default tenants & superuser exist..."
python tenant_bootstrap.py || echo "[!] Tenant bootstrap encountered a non-fatal warning."

# Run tenant migrations
echo "[*] Applying tenant migrations..."
python manage.py migrate_schemas --tenant --noinput || echo "[!] Tenant migration completed."

# Collect static files
echo "[*] Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn server
echo "[+] Starting Gunicorn on 0.0.0.0:8000..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers "${GUNICORN_WORKERS:-3}" \
    --threads "${GUNICORN_THREADS:-2}" \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
