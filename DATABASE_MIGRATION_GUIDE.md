# 🗄️ Database Migration Guide
## Implementing New Prisma Schema with Student Management Models

**Created:** January 18, 2025  
**Status:** Ready for Execution  
**Priority:** CRITICAL

---

## 📋 Overview

This guide walks you through migrating from the basic User model to the complete school management database schema with 7 new models:

1. **Student** - Student profile and enrollment data
2. **Subject** - Academic subjects and teacher assignments
3. **Grade** - Student grades and academic performance
4. **Attendance** - Daily attendance tracking
5. **Assignment** - Homework and assignments
6. **AssignmentSubmission** - Student assignment submissions
7. **FeePayment** - Financial tracking and payments

---

## ⚠️ Prerequisites

### 1. PostgreSQL Database

You need a PostgreSQL database. Choose one option:

#### Option A: Vercel Postgres (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Create Postgres database
vercel postgres create regisbridge-db

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local
```

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database
4. Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

#### Option C: Railway
```bash
# Visit railway.app
# Create new PostgreSQL database
# Copy DATABASE_URL from Variables tab
```

#### Option D: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database
createdb regisbridge

# Connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/regisbridge"
```

### 2. Environment Variables

Add to `.env.local`:
```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT Secrets (generate with: openssl rand -base64 64)
JWT_SECRET="your-secure-jwt-secret-key-here"
JWT_REFRESH_SECRET="your-secure-refresh-secret-key-here"

# Optional: SendGrid for emails
SENDGRID_API_KEY="your-sendgrid-api-key"

# Environment
NODE_ENV="development"
```

---

## 🚀 Migration Steps

### Step 1: Verify Schema

The new schema is already in `prisma/schema.prisma`. Verify it:

```bash
# Check schema syntax
npx prisma validate
```

Expected output:
```
✅ The schema is valid
```

### Step 2: Generate Prisma Client

```bash
# Generate TypeScript types and client
npx prisma generate
```

This creates:
- `node_modules/@prisma/client` with TypeScript types
- All model types (Student, Grade, Attendance, etc.)

### Step 3: Create Migration

```bash
# Create migration with descriptive name
npx prisma migrate dev --name add_school_management_models
```

This will:
1. Create migration SQL files in `prisma/migrations/`
2. Apply migration to database
3. Regenerate Prisma Client

Expected output:
```
✅ Migrations applied successfully
✅ Generated Prisma Client
```

### Step 4: Verify Database

```bash
# Open Prisma Studio to inspect database
npx prisma studio
```

This opens a web UI at `http://localhost:5555` where you can:
- View all tables
- Add/edit/delete records
- Verify relationships

### Step 5: Seed Initial Data (Optional)

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 10);
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
  });

  console.log('✅ Admin user:', admin.email);

  // Create sample teacher
  const teacherPassword = await bcrypt.hash('Teacher123!', 10);
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@regisbridge.ac.zw' },
    update: {},
    create: {
      email: 'teacher@regisbridge.ac.zw',
      password: teacherPassword,
      firstName: 'John',
      lastName: 'Teacher',
      role: 'teacher',
      status: 'active',
    },
  });

  console.log('✅ Teacher user:', teacher.email);

  // Create sample subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { code: 'MATH-G7' },
      update: {},
      create: {
        name: 'Mathematics',
        code: 'MATH-G7',
        grade: 'Grade 7',
        description: 'Grade 7 Mathematics',
        teacherId: teacher.id,
      },
    }),
    prisma.subject.upsert({
      where: { code: 'ENG-G7' },
      update: {},
      create: {
        name: 'English Language',
        code: 'ENG-G7',
        grade: 'Grade 7',
        description: 'Grade 7 English',
        teacherId: teacher.id,
      },
    }),
    prisma.subject.upsert({
      where: { code: 'SCI-G7' },
      update: {},
      create: {
        name: 'Science',
        code: 'SCI-G7',
        grade: 'Grade 7',
        description: 'Grade 7 Science',
        teacherId: teacher.id,
      },
    }),
  ]);

  console.log(`✅ Created ${subjects.length} subjects`);

  // Create sample student user
  const studentPassword = await bcrypt.hash('Student123!', 10);
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@regisbridge.ac.zw' },
    update: {},
    create: {
      email: 'student@regisbridge.ac.zw',
      password: studentPassword,
      firstName: 'Jane',
      lastName: 'Student',
      role: 'student',
      status: 'active',
    },
  });

  // Create student profile
  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      currentGrade: 'Grade 7',
      section: 'A',
      rollNumber: 'STU2025001',
      parentName: 'Parent Name',
      parentEmail: 'parent@example.com',
      parentPhone: '+263771234567',
    },
  });

  console.log('✅ Student profile:', student.rollNumber);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Run seed:
```bash
# Install ts-node if not already installed
npm install -D ts-node

# Run seed
npx prisma db seed
```

---

## 🔧 Update Application Code

### 1. Update Database Service

Update `src/lib/db.ts` to remove in-memory fallback:

```typescript
import { PrismaClient } from '@prisma/client';

// Ensure database is configured
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'Please configure your PostgreSQL database.'
  );
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Export helper functions
export async function findUserByEmailInDB(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUserInDB(userData: any) {
  return prisma.user.create({ data: userData });
}

export async function findUserByIdInDB(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

// New student functions
export async function createStudent(studentData: any) {
  return prisma.student.create({ data: studentData });
}

export async function findStudentById(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function getAllStudents(grade?: string) {
  return prisma.student.findMany({
    where: grade ? { currentGrade: grade } : undefined,
    include: { user: true },
    orderBy: { rollNumber: 'asc' },
  });
}
```

### 2. Create API Routes

Example: `src/app/api/admin/students/route.ts`

```typescript
import { NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth-middleware';
import { secureResponse } from '@/lib/security-headers';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { user, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where = grade ? { currentGrade: grade } : {};

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        include: { user: { select: { firstName: true, lastName: true, email: true } } },
        skip,
        take: limit,
        orderBy: { rollNumber: 'asc' },
      }),
      prisma.student.count({ where }),
    ]);

    return secureResponse({
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return secureResponse(
      { success: false, message: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}
```

---

## ✅ Verification Checklist

After migration, verify:

- [ ] Database connection works
- [ ] All 8 tables exist (User, Student, Subject, Grade, Attendance, Assignment, AssignmentSubmission, FeePayment)
- [ ] Foreign key relationships are correct
- [ ] Indexes are created
- [ ] Seed data is populated
- [ ] Prisma Studio opens successfully
- [ ] Test queries work in Studio
- [ ] Application builds without errors
- [ ] Tests pass (run `npm test`)

---

## 🚨 Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"

**Solution:** Add `DATABASE_URL` to `.env.local` or Vercel environment variables.

### Error: "Migration failed: relation already exists"

**Solution:** Reset database and re-run migration:
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Error: "Can't reach database server"

**Solution:** Check:
1. Database is running
2. Connection string is correct
3. Firewall allows connections
4. IP address is whitelisted (for cloud databases)

### Error: "Type 'Date' is not assignable to type 'string'"

**Solution:** Run `npx prisma generate` to regenerate types after schema changes.

---

## 📊 Performance Optimization

### Add Connection Pooling

For production, configure Prisma connection pooling:

```typescript
// src/lib/db.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=10&pool_timeout=20',
    },
  },
});
```

### Use Query Optimization

```typescript
// Good: Select only needed fields
const students = await prisma.student.findMany({
  select: {
    id: true,
    rollNumber: true,
    user: { select: { firstName: true, lastName: true } },
  },
});

// Bad: Fetches all fields
const students = await prisma.student.findMany({
  include: { user: true },
});
```

---

## 🎯 Next Steps

After successful migration:

1. **Implement Student Management APIs** (Week 2 of action plan)
2. **Build Grade Entry Interface** (Week 3)
3. **Create Attendance Marking UI** (Week 3)
4. **Fix 42 failing tests** (update test data)
5. **Deploy to production** (Vercel)

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Setup Guide](./POSTGRES_SETUP.md)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Database Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

**Migration Ready:** ✅  
**Estimated Time:** 1-2 hours  
**Risk Level:** Low (can rollback with `npx prisma migrate reset`)

