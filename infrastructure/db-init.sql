-- ==============================================================================
-- Regisbridge School Management System: Multi-Database Initializer
-- Mounted into /docker-entrypoint-initdb.d/ to create both logical databases
-- ==============================================================================

-- 1. Create database for Next.js 15 (Prisma ORM)
SELECT 'CREATE DATABASE regisbridge_web'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'regisbridge_web')\gexec

-- 2. Create database for Django (django-tenants & DRF)
SELECT 'CREATE DATABASE regisbridge_django'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'regisbridge_django')\gexec

-- 3. Grant full privileges on both databases to the application user
GRANT ALL PRIVILEGES ON DATABASE regisbridge_web TO CURRENT_USER;
GRANT ALL PRIVILEGES ON DATABASE regisbridge_django TO CURRENT_USER;
