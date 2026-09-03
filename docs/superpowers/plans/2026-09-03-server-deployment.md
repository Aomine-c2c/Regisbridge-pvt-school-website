# Regisbridge School Management System — Production Server Deployment Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully prepare and containerize the Regisbridge School Management System (Next.js 15 standalone + Django multi-tenant backend + PostgreSQL 16 + internal gateway) for zero-port-conflict deployment on a Linux VPS hosting other websites via a Unix domain socket.

**Architecture:** 
- Internal multi-container Docker Compose stack running in a private bridge network (`db`, `backend`, `frontend`, `gateway`).
- Zero TCP ports exposed on the host; internal Nginx gateway listens on a shared Unix Domain Socket (`/run/regisbridge/app.sock`).
- Host Nginx forwards incoming domain traffic to the Unix socket and handles SSL via Certbot.
- Automatic entrypoints handle database migration and baseline admin seeding on first boot.

**Tech Stack:** Next.js 15, React 18, TypeScript, Prisma, Python 3.12, Django 5.1+, `django-tenants`, PostgreSQL 16 Alpine, Gunicorn, Nginx, Docker & Docker Compose, Paramiko (Python deployer).

## Global Constraints
- Target workspace: `c:\Users\armut\404\Regisbridge-pvt-school-website`
- Ingress: Unix domain socket `/run/regisbridge/app.sock` with permission `0666` or `www-data` group compatibility.
- Two logical PostgreSQL databases in single `db` container: `regisbridge_web` (Prisma) and `regisbridge_django` (Django tenants).
- Next.js retains `/admin` for the School Admin Portal; Django admin is mounted at `/django-admin/`.
- No placeholders, no TODOs. All scripts must be complete and production-ready.

---

### Task 1: Database Initialization Script

**Files:**
- Create: `infrastructure/db-init.sql`

**Interfaces:**
- Consumes: PostgreSQL default superuser environment variables (`POSTGRES_USER`, `POSTGRES_PASSWORD`).
- Produces: `regisbridge_web` and `regisbridge_django` databases ready inside PostgreSQL container on first startup.

- [ ] **Step 1: Write `infrastructure/db-init.sql`**
Create database initialization script that creates both logical databases if they do not exist:
```sql
-- Create regisbridge_web for Next.js (Prisma)
SELECT 'CREATE DATABASE regisbridge_web'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'regisbridge_web')\gexec

-- Create regisbridge_django for Django (django-tenants)
SELECT 'CREATE DATABASE regisbridge_django'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'regisbridge_django')\gexec

GRANT ALL PRIVILEGES ON DATABASE regisbridge_web TO CURRENT_USER;
GRANT ALL PRIVILEGES ON DATABASE regisbridge_django TO CURRENT_USER;
```

- [ ] **Step 2: Commit Task 1**
```bash
git add infrastructure/db-init.sql
git commit -m "feat(deploy): add database initialization script for dual logical databases"
```

---

### Task 2: Django Backend Containerization & Parameterization

**Files:**
- Create: `backend/requirements.txt`
- Modify: `backend/core/settings.py`
- Modify: `backend/core/urls.py`
- Create: `backend/tenant_bootstrap.py`
- Create: `backend/entrypoint.sh`
- Create: `Dockerfile.backend`

**Interfaces:**
- Consumes: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`.
- Produces: Gunicorn WSGI server listening on `0.0.0.0:8000`, Django admin on `/django-admin/`, APIs on `/api/v1/`.

- [ ] **Step 1: Create `backend/requirements.txt`**
```text
Django>=5.1.0,<6.0.0
django-tenants>=3.7.0
djangorestframework>=3.15.0
psycopg2-binary>=2.9.9
gunicorn>=22.0.0
python-dotenv>=1.0.1
```

- [ ] **Step 2: Update `backend/core/settings.py` for environment variables**
Modify `DATABASES`, `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` to read from `os.getenv` with safe fallbacks. Ensure `STATIC_ROOT = BASE_DIR / 'staticfiles'` is configured for `collectstatic`.

- [ ] **Step 3: Update `backend/core/urls.py` to route Django admin at `/django-admin/`**
Change `path('admin/', admin.site.urls)` to `path('django-admin/', admin.site.urls)`.

- [ ] **Step 4: Create `backend/tenant_bootstrap.py`**
Idempotently creates the public schema tenant and default school tenant:
```python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from tenants.models import SchoolTenant, Domain

# 1. Public tenant
if not SchoolTenant.objects.filter(schema_name='public').exists():
    public_tenant = SchoolTenant(
        schema_name='public',
        name='Regisbridge Master System',
        subscription_plan='ENTERPRISE'
    )
    public_tenant.save()
    domain = Domain(
        domain=os.getenv('SERVER_DOMAIN', 'localhost'),
        tenant=public_tenant,
        is_primary=True
    )
    domain.save()
    print("[+] Public tenant created.")
else:
    print("[*] Public tenant already exists.")
```

- [ ] **Step 5: Create `backend/entrypoint.sh` and `Dockerfile.backend`**
Wait for PostgreSQL port 5432, run `python manage.py migrate_schemas --shared`, run `python tenant_bootstrap.py`, run `python manage.py collectstatic --noinput`, and exec `gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 120`.

- [ ] **Step 6: Commit Task 2**
```bash
git add backend/ Dockerfile.backend
git commit -m "feat(backend): containerize Django backend with dynamic envs and tenant bootstrap"
```

---

### Task 3: Next.js Frontend Multi-Stage Dockerization

**Files:**
- Create: `Dockerfile.frontend`
- Create: `frontend-entrypoint.sh`
- Create: `.dockerignore`

**Interfaces:**
- Consumes: `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `NEXTAUTH_SECRET`, `NODE_ENV`.
- Produces: Next.js standalone container listening on `0.0.0.0:3000`.

- [ ] **Step 1: Create `.dockerignore`**
Exclude `.git`, `.next`, `node_modules`, `*.log`, `.env*`, `test-results`, `docs`.

- [ ] **Step 2: Create `Dockerfile.frontend`**
Multi-stage build:
- Stage 1 (`deps`): installs dependencies using `npm ci`.
- Stage 2 (`builder`): runs `npx prisma generate` and `npm run build`.
- Stage 3 (`runner`): copies `public/`, `.next/standalone`, `.next/static`, and `prisma/`.

- [ ] **Step 3: Create `frontend-entrypoint.sh`**
Wait for PostgreSQL on database `regisbridge_web`, run `npx prisma db push --accept-data-loss=false`, run `node --loader ts-node/esm prisma/seed.ts`, and launch `node server.js`.

- [ ] **Step 4: Commit Task 3**
```bash
git add Dockerfile.frontend frontend-entrypoint.sh .dockerignore
git commit -m "feat(frontend): create standalone Next.js Dockerfile and migration entrypoint"
```

---

### Task 4: Gateway (Unix Domain Socket Router)

**Files:**
- Create: `gateway/nginx.conf`
- Create: `gateway/Dockerfile`
- Create: `gateway/entrypoint.sh`

**Interfaces:**
- Consumes: Socket directory `/run/regisbridge`, upstreams `frontend:3000` and `backend:8000`.
- Produces: Unix domain socket `/run/regisbridge/app.sock` with permission `0666`.

- [ ] **Step 1: Create `gateway/nginx.conf`**
Configure internal routing:
```nginx
events { worker_connections 1024; }
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    client_max_body_size 50M;

    upstream frontend_app { server frontend:3000; }
    upstream backend_app { server backend:8000; }

    server {
        listen unix:/run/regisbridge/app.sock;

        location /django-admin/ {
            proxy_pass http://backend_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /api/v1/ {
            proxy_pass http://backend_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /uploads/ {
            alias /var/www/uploads/;
            expires 30d;
            access_log off;
        }

        location /static/ {
            alias /var/www/django_static/;
            expires 30d;
            access_log off;
        }

        location / {
            proxy_pass http://frontend_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

- [ ] **Step 2: Create `gateway/entrypoint.sh` and `gateway/Dockerfile`**
Entrypoint creates socket dir, removes stale socket file if present, starts nginx in background, runs `chmod 666 /run/regisbridge/app.sock` once socket appears, and waits on nginx.

- [ ] **Step 3: Commit Task 4**
```bash
git add gateway/
git commit -m "feat(gateway): add unix domain socket internal routing gateway"
```

---

### Task 5: Master Docker Compose & Production Environment Template

**Files:**
- Create: `docker-compose.prod.yml`
- Create: `.env.production.example`

**Interfaces:**
- Consumes: Environment variables in `.env.production`.
- Produces: Self-healing multi-service stack with persistent storage and healthchecks.

- [ ] **Step 1: Create `.env.production.example`**
Comprehensive template including database credentials, JWT secrets, application URLs, rate limits, and SendGrid/Twilio settings.

- [ ] **Step 2: Create `docker-compose.prod.yml`**
Defines `db`, `backend`, `frontend`, and `gateway` services with:
- Healthchecks on PostgreSQL (`pg_isready`).
- Dependencies (`depends_on: db: condition: service_healthy`).
- Persistent named volumes: `regisbridge_db_data`, `regisbridge_uploads`, `regisbridge_django_static`, `regisbridge_socket`.
- Restart policy: `unless-stopped`.

- [ ] **Step 3: Commit Task 5**
```bash
git add docker-compose.prod.yml .env.production.example
git commit -m "feat(docker): add production docker compose and environment template"
```

---

### Task 6: Host Nginx & Deployment Automation Scripts

**Files:**
- Create: `deploy/regisbridge.conf`
- Create: `deploy/setup_server.sh`
- Create: `deploy/update.sh`
- Create: `deploy/backup_db.sh`
- Create: `deploy/restore_db.sh`
- Create: `deploy/deploy_to_server.py`

**Interfaces:**
- Consumes: Host Ubuntu/Debian system, existing host Nginx, SSH/SFTP access.
- Produces: 1-click server bootstrap, zero-downtime updates, automated backups, and remote push tool.

- [ ] **Step 1: Create `deploy/regisbridge.conf`**
Virtual host config for host Nginx with `proxy_pass http://unix:/run/regisbridge/app.sock;` and Certbot instructions.

- [ ] **Step 2: Create `deploy/setup_server.sh`**
Bash script to verify Docker/Compose, setup host directories and permissions (`/run/regisbridge`), generate secrets into `.env.production`, launch containers, and link host Nginx config.

- [ ] **Step 3: Create `deploy/update.sh`**
Script to rebuild and restart containers with zero downtime and clean up dangling images.

- [ ] **Step 4: Create `deploy/backup_db.sh` & `deploy/restore_db.sh`**
Automated PostgreSQL database dumps for `regisbridge_web` and `regisbridge_django` with timestamping and 14-day retention.

- [ ] **Step 5: Create `deploy/deploy_to_server.py`**
Cross-platform Paramiko Python script to tar local code, SFTP upload to server, and trigger remote build/setup.

- [ ] **Step 6: Commit Task 6**
```bash
git add deploy/
git commit -m "feat(ops): add deployment automation scripts and host nginx config"
```

---

### Task 7: End-to-End Build & Validation Check

**Files:**
- Verify all created files and scripts.

- [ ] **Step 1: Validate Next.js build compilation locally**
Run `npm run build` to verify that Next.js compiles cleanly under standalone mode.

- [ ] **Step 2: Validate Docker compose configuration**
Validate syntax and YAML formatting of `docker-compose.prod.yml`.

- [ ] **Step 3: Update `README.md` with Server Deployment Guide**
Document step-by-step how to deploy to the Ubuntu server using either the local push script or server git-pull.

- [ ] **Step 4: Final commit**
```bash
git add README.md
git commit -m "docs: add comprehensive production server deployment guide"
```
