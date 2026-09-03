#!/bin/sh
set -e

SOCKET_DIR="/run/regisbridge"
SOCKET_FILE="${SOCKET_DIR}/app.sock"

mkdir -p "$SOCKET_DIR"
rm -f "$SOCKET_FILE"

echo "[*] Launching Gateway Nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Wait for socket to be created by Nginx, then set open permissions
echo "[*] Waiting for Unix socket ${SOCKET_FILE}..."
for i in $(seq 1 30); do
    if [ -S "$SOCKET_FILE" ]; then
        echo "[+] Setting socket permissions (0666) on ${SOCKET_FILE}..."
        chmod 666 "$SOCKET_FILE"
        break
    fi
    sleep 0.2
done

trap "kill -TERM $NGINX_PID" INT TERM

wait $NGINX_PID
