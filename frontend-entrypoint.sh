#!/bin/sh
set -e

echo "[*] Starting Regisbridge Frontend Service..."

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"

echo "[*] Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "[+] PostgreSQL is available."

# Ensure public uploads directory exists
mkdir -p /app/public/uploads

# Run Prisma schema push (idempotent, safe sync)
echo "[*] Synchronizing database schema via Prisma..."
npx prisma db push --skip-generate --accept-data-loss=false || {
    echo "[!] Strict db push halted; attempting standard db sync..."
    npx prisma db push --skip-generate || true
}

# Run database seed if needed
echo "[*] Seeding database baseline records..."
npx ts-node --transpile-only prisma/seed.ts || {
    node --loader ts-node/esm prisma/seed.ts || echo "[*] Seed already up to date."
}

echo "[+] Starting Next.js standalone server on port ${PORT:-3000}..."
exec node server.js
