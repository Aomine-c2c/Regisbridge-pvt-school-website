# Technical Design Spec: Production Server Deployment for Regisbridge School Management System

**Date:** 2026-09-03  
**Target Application:** Regisbridge School Management System (`c:\Users\armut\404\Regisbridge-pvt-school-website`)  
**Target Environment:** Linux VPS / Dedicated Server (Ubuntu/Debian) hosting other websites  
**Ingress Strategy:** Zero-Port Host Integration via Unix Domain Socket (`/run/regisbridge/app.sock`)

---

## 1. Context & Business Requirements

The Regisbridge School Management System is a multi-tier educational platform comprising:
- A modern **Next.js 15** frontend/fullstack application with React 18, TypeScript, Tailwind CSS, Prisma ORM, and internal `/api/` endpoints (managing users, admissions, HR, student portals, etc.).
- A **Python 3.12 / Django** backend (`backend/`) utilizing `django-tenants` and Django REST Framework for multi-tenant schema isolation, academics, and tenant management.
- A **PostgreSQL** database.

The production server is an Ubuntu/Debian host that is **already serving other live websites**. Ports 80 and 443 are already bound by the host's existing web server (Nginx). The deployment must guarantee zero port collisions, zero downtime for existing host sites, automated persistence, and simple one-click operations.

---

## 2. System Architecture

```
Internet (HTTPS 443 / HTTP 80)
            │
            ▼
┌──────────────────────────────────────────────────────────┐
│ Host Server (Ubuntu/Debian)                              │
│ Host Nginx (Existing Reverse Proxy)                      │
│ - Virtual host: /etc/nginx/sites-available/regisbridge.conf
│ - SSL managed by Host Certbot (Let's Encrypt)           │
└───────────────────────────┬──────────────────────────────┘
                            │
              Unix Domain Socket Proxy:
              http://unix:/run/regisbridge/app.sock
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│ Regisbridge Docker Network (`regisbridge_net`)           │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 1. Gateway (Internal Nginx)                        │  │
│  │    - Listens on /run/regisbridge/app.sock          │  │
│  │    - Routes /django-admin/ & /api/v1/ -> Backend   │  │
│  │    - Routes /admin/ & all web routes -> Frontend   │  │
│  │    - Serves /uploads/ & /media/ directly           │  │
│  └────────┬───────────────────┬───────────────────────┘  │
│           │                   │                          │
│           ▼                   ▼                          │
│  ┌─────────────────┐ ┌──────────────────────────────┐    │
│  │ 2. Frontend     │ │ 3. Backend (Django / Gunicorn│    │
│  │    Next.js 15   │ │    Python 3.12               │    │
│  │    Standalone   │ │    django-tenants + DRF      │    │
│  │    (Port 3000)  │ │    (Port 8000)               │    │
│  └────────┬────────┘ └────────┬─────────────────────┘    │
│           │                   │                          │
│           └───────────┬───────┘                          │
│                       ▼                                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 4. Database (PostgreSQL 16 Alpine)                 │  │
│  │    - Database 1: `regisbridge_web` (Prisma)        │  │
│  │    - Database 2: `regisbridge_django` (Tenants)    │  │
│  │    - Volume: `postgres_data` (Persistent)          │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Component Details & Specifications

### 3.1. Database (`db` container)
- **Image:** `postgres:16-alpine`.
- **Initialization:** An initialization SQL script (`infrastructure/db-init.sql`) runs on first boot to create two isolated logical databases:
  1. `regisbridge_web` for Next.js Prisma ORM.
  2. `regisbridge_django` for Django `django-tenants`.
- **Volume:** Named Docker volume `regisbridge_db_data` mounted to `/var/lib/postgresql/data`.
- **Security:** Private to `regisbridge_net`; no external host ports exposed.

### 3.2. Frontend (`frontend` container)
- **Build Process:** Multi-stage `Dockerfile.frontend`:
  - `deps`: Installs `node_modules` via `npm ci`.
  - `builder`: Generates Prisma client (`npx prisma generate`) and builds standalone Next.js bundle (`npm run build`).
  - `runner`: Lightweight Alpine image containing only Node.js, `.next/standalone`, `.next/static`, and `public/`.
- **Startup Entrypoint (`entrypoint.sh`):**
  - Waits for PostgreSQL `regisbridge_web` to accept connections.
  - Automatically executes `npx prisma db push --accept-data-loss=false` or `npx prisma migrate deploy`.
  - Runs `npx ts-node prisma/seed.ts` to idempotently seed admin and baseline data if not already present.
  - Launches Next.js standalone server (`node server.js`).
- **Environment:**
  - `DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/regisbridge_web`
  - `NODE_ENV=production`
  - `PORT=3000`
  - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `NEXTAUTH_SECRET` generated securely.

### 3.3. Backend (`backend` container)
- **Dependencies (`requirements.txt`):**
  - `Django>=5.1,<6.0`
  - `django-tenants>=3.7.0`
  - `djangorestframework>=3.15.0`
  - `psycopg2-binary>=2.9.9`
  - `gunicorn>=22.0.0`
  - `python-dotenv>=1.0.0`
- **Settings Refactoring (`backend/core/settings.py`):**
  - Parameterized with `os.getenv` for `SECRET_KEY`, `DEBUG` (default `False`), `ALLOWED_HOSTS`, and `DATABASES['default']` (`HOST=db`, `NAME=regisbridge_django`, `USER`, `PASSWORD`, `PORT=5432`).
- **Routing Configuration (`backend/core/urls.py`):**
  - Maps Django admin to `django-admin/` (`path('django-admin/', admin.site.urls)`).
  - Preserves `api/v1/tenants/` and `api/v1/academics/`.
- **Startup Entrypoint:**
  - Waits for PostgreSQL `regisbridge_django`.
  - Runs `python manage.py migrate_schemas --shared`.
  - Runs tenant bootstrap (creates public tenant and default school tenant if absent).
  - Collects static files to `/app/static/`.
  - Starts Gunicorn: `gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3`.

### 3.4. Internal Gateway (`gateway` container)
- **Role:** Bridges the Unix Domain Socket with the internal Docker services and handles URL dispatching.
- **Socket Mount:** Shared volume `/run/regisbridge` mounted into `/run/regisbridge/app.sock` with permission mask `0666` / `www-data` group compatibility.
- **Routing Rules:**
  - `/django-admin/` $\rightarrow$ `http://backend:8000/django-admin/`
  - `/api/v1/` $\rightarrow$ `http://backend:8000/api/v1/`
  - `/static/` (Django static) $\rightarrow$ Serves directly from `/var/www/django_static`
  - `/uploads/` & `/media/` $\rightarrow$ Serves directly from persistent volume `/var/www/uploads`
  - `/` and all other routes $\rightarrow$ `http://frontend:3000`

### 3.5. Host Nginx Integration (`deploy/regisbridge.conf`)
A clean virtual host configuration for the host system:
```nginx
server {
    listen 80;
    server_name school.regisbridge.com; # Replace with production domain

    client_max_body_size 50M;

    location / {
        proxy_pass http://unix:/run/regisbridge/app.sock;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
*SSL Certificate is acquired with zero disruption via standard host Certbot:*
`certbot --nginx -d school.regisbridge.com`

---

## 4. Deployment Automation & Operations

### 4.1. Server Directory Structure
```
/opt/regisbridge/
├── .env.production
├── docker-compose.prod.yml
├── Dockerfile.frontend
├── Dockerfile.backend
├── gateway/
│   ├── Dockerfile
│   └── nginx.conf
├── deploy/
│   ├── regisbridge.conf
│   ├── setup_server.sh
│   ├── update.sh
│   ├── backup_db.sh
│   └── restore_db.sh
├── infrastructure/
│   └── db-init.sql
├── backend/
└── (frontend / Next.js source)
```

### 4.2. Operational Scripts
1. `deploy/setup_server.sh`:
   - Installs Docker and Docker Compose plugin if missing.
   - Prepares `/run/regisbridge/` directory with `www-data` ownership.
   - Generates `.env.production` with secure cryptographic secrets if absent.
   - Builds and boots the stack (`docker compose -f docker-compose.prod.yml up -d --build`).
   - Copies `deploy/regisbridge.conf` to `/etc/nginx/sites-available/` and enables it via symlink.
   - Verifies Nginx configuration (`nginx -t`) and reloads Nginx (`systemctl reload nginx`).
2. `deploy/update.sh`:
   - Pulls latest updates or extracts deployment package.
   - Runs `docker compose -f docker-compose.prod.yml up -d --build`.
   - Cleans up dangling images to prevent disk exhaustion.
3. `deploy/deploy_to_server.py`:
   - Local cross-platform Python CLI (runs on Windows/Mac/Linux).
   - Bundles source code, transfers to VPS via SFTP, and executes remote deployment commands via SSH.
4. `deploy/backup_db.sh`:
   - Automated `pg_dump` of both `regisbridge_web` and `regisbridge_django` with gzip compression and 14-day automatic rotation.

---

## 5. Security & Isolation Verification Plan

1. **Host Coexistence:** Host ports 80/443 remain exclusively owned by host Nginx. No TCP port conflicts occur.
2. **Socket Permissions:** `/run/regisbridge/app.sock` has `0660` or `0666` permissions accessible by the host `www-data` user.
3. **Database Security:** PostgreSQL port 5432 is not published to the host; reachable only via internal Docker network.
4. **Data Durability:** Database records, Next.js uploads, and Django media persist across container destruction and host reboots via Docker volumes.
