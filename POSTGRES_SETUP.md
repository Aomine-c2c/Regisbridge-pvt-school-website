# PostgreSQL Database Setup Guide for Regisbridge School

## Overview
This guide walks you through provisioning a PostgreSQL database on Vercel, connecting it to your Next.js application, and running Prisma migrations.

## Prerequisites
- Vercel account with the Regisbridge project deployed
- Vercel CLI installed (`npm i -g vercel`)
- Node.js and npm installed locally
- Git repository cloned locally

## Step 1: Create Vercel Postgres Database

### Option A: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project (**regisbridge-school-nextjs** or **regisbridge.page**)
3. Navigate to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Configure database:
   - **Database Name**: `regisbridge-production` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., `us-east-1`, `eu-west-1`)
   - **Plan**: Start with **Hobby** (free tier) or upgrade to **Pro** for production
7. Click **Create**
8. Wait for provisioning (usually 1-2 minutes)

### Option B: Via Vercel CLI
```bash
# Login to Vercel
vercel login

# Link to your project
vercel link

# Create Postgres database
vercel postgres create regisbridge-production
```

## Step 2: Connect Database to Project

### Automatic Connection (Dashboard Method)
1. After database creation, click **Connect Project**
2. Select your project from the list
3. Click **Connect**
4. Vercel automatically injects these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL` (optimized for Prisma)
   - `POSTGRES_URL_NON_POOLING` (direct connection)
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### Manual Connection (If needed)
1. Go to **Settings** → **Environment Variables**
2. Click on the `POSTGRES_PRISMA_URL` variable
3. Copy the connection string (format: `postgresql://user:password@host:5432/database?sslmode=require&pgbouncer=true&connect_timeout=15`)
4. Rename to `DATABASE_URL` or use as-is

## Step 3: Update Local Environment

### Create `.env.local` file (if not exists)
```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/regisbridge_dev"

# For Vercel Postgres, you'll get this from the dashboard:
# DATABASE_URL="postgresql://user:password@host.postgres.vercel.com:5432/database?sslmode=require&pgbouncer=true"
```

### Pull Environment Variables from Vercel
```bash
# Download all environment variables from Vercel
vercel env pull .env.local

# This will populate .env.local with all production env vars including DATABASE_URL
```

**Important**: `.env.local` is already in `.gitignore` - never commit it!

## Step 4: Verify Prisma Schema

Check that `prisma/schema.prisma` is configured correctly:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String
  firstName   String
  lastName    String
  role        String   @default("student")
  grade       String?
  studentId   String?
  phoneNumber String?
  status      String   @default("active")
  permissions Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("users")
}
```

## Step 5: Generate Prisma Client

```bash
# Generate Prisma client based on schema
npx prisma generate
```

This creates the TypeScript types and Prisma client in `node_modules/@prisma/client`.

## Step 6: Create and Apply Database Migrations

### Development Migration (Local)
```bash
# Create initial migration with name
npx prisma migrate dev --name init

# This will:
# 1. Create a migration file in prisma/migrations/
# 2. Apply the migration to your local database
# 3. Regenerate Prisma client
```

### Production Migration (Vercel)

#### Option A: Via Vercel CLI (Recommended for first deployment)
```bash
# Deploy migrations to production
npx prisma migrate deploy

# Or run via Vercel CLI
vercel env exec -- npx prisma migrate deploy
```

#### Option B: Via Vercel Build Command (Automatic)
Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

This runs migrations automatically on every Vercel deployment.

#### Option C: Manual via Prisma Studio
```bash
# Open Prisma Studio to manually manage data
npx prisma studio

# This opens a GUI at http://localhost:5555
```

## Step 7: Verify Database Connection

### Test Locally
```bash
# Start dev server
npm run dev

# Try to register a user via the API
# POST http://localhost:3000/api/auth/register
```

### Test Connection via Prisma
Create a test script `scripts/test-db.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Testing database connection...')
  
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    const userCount = await prisma.user.count()
    console.log(`📊 Current user count: ${userCount}`)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
```

Run it:
```bash
npx tsx scripts/test-db.ts
```

## Step 8: Update Application Code

The application already uses the database abstraction layer in `src/lib/db.ts`. This file automatically:
- ✅ Uses Prisma when `DATABASE_URL` is configured
- ✅ Falls back to in-memory storage when `DATABASE_URL` is not set
- ✅ Handles connection pooling and error handling

No code changes needed! Just set `DATABASE_URL` and the app will use Postgres.

## Step 9: Seed Initial Data (Optional)

### Create seed script `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Create admin user
  const adminPassword = await bcrypt.hash('AdminPassword123!', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@regisbridge.ac.zw' },
    update: {},
    create: {
      email: 'admin@regisbridge.ac.zw',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'admin',
      status: 'active',
    },
  })
  
  console.log('✅ Admin user created:', admin.email)
  
  // Create sample student
  const studentPassword = await bcrypt.hash('Student123!', 10)
  const student = await prisma.user.upsert({
    where: { email: 'student@regisbridge.ac.zw' },
    update: {},
    create: {
      email: 'student@regisbridge.ac.zw',
      password: studentPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'student',
      grade: 'Grade 12',
      studentId: 'STU001',
      status: 'active',
    },
  })
  
  console.log('✅ Sample student created:', student.email)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Configure seed in `package.json`:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed"
  }
}
```

### Run seed:
```bash
npm run db:seed
```

## Step 10: Monitor and Maintain

### View Database in Vercel Dashboard
1. Go to **Storage** tab
2. Click on your Postgres database
3. View:
   - Connection details
   - Usage metrics (storage, queries, connections)
   - Activity logs

### Prisma Studio (Visual Database Browser)
```bash
npx prisma studio
```
Opens a GUI at http://localhost:5555 to view/edit data.

### Database Backups
Vercel Postgres (Hobby/Pro plans) includes:
- ✅ Automatic daily backups
- ✅ Point-in-time recovery
- ✅ High availability

### Monitoring Queries
Add Prisma logging in `src/lib/db.ts`:
```typescript
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

## Troubleshooting

### Connection timeout errors
- Check that `DATABASE_URL` includes `connect_timeout=15`
- Verify database region is close to deployment region
- Consider using `POSTGRES_PRISMA_URL` for better connection pooling

### "Too many connections" error
- Use `POSTGRES_PRISMA_URL` (includes PgBouncer pooling)
- Reduce `connection_limit` in Prisma schema:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    connectionLimit = 5
  }
  ```

### Migration conflicts
```bash
# Reset database (⚠️ CAUTION: Deletes all data)
npx prisma migrate reset

# Or manually resolve conflicts
npx prisma migrate resolve --applied "20240115_migration_name"
```

### SSL/TLS errors
Ensure connection string includes `sslmode=require`:
```
postgresql://user:pass@host:5432/db?sslmode=require
```

## Environment Variables Summary

After setup, you should have these in Vercel:

| Variable | Source | Usage |
|----------|--------|-------|
| `DATABASE_URL` | Manual or from `POSTGRES_PRISMA_URL` | Prisma connection string |
| `POSTGRES_PRISMA_URL` | Auto-generated | Optimized for Prisma with pooling |
| `POSTGRES_URL` | Auto-generated | Direct connection URL |
| `POSTGRES_URL_NON_POOLING` | Auto-generated | Direct connection without pooling |
| `JWT_SECRET` | Manual | Authentication tokens |
| `JWT_REFRESH_SECRET` | Manual | Refresh tokens |
| `SENDGRID_API_KEY` | Manual | Email service |
| `CRON_SECRET` | Manual | Cron job authentication |

## Next Steps After Setup

1. ✅ Test user registration: `POST /api/auth/register`
2. ✅ Test user login: `POST /api/auth/login`
3. ✅ Verify data persistence: Restart app, users should still exist
4. ✅ Run test suite: `npm run test:integration`
5. ✅ Monitor logs in Vercel dashboard
6. ✅ Set up database backups (automatic on Pro plan)
7. ✅ Create admin users via seed script
8. ✅ Document database schema for team

## Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Connection String Format](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

**Status**: After completing these steps, your application will have persistent data storage and all authentication/user management features will work correctly in production.
