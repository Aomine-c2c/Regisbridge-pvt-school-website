import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use a dummy URL during build if DATABASE_URL is not set
const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/regisbridge'

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Test database connection
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect()
    // console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Graceful shutdown
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
    // console.log('✅ Database disconnected successfully')
  } catch (error) {
    console.error('❌ Database disconnection failed:', error)
  }
}

// Multi-Tenant Restricted Client
export function getTenantDb(tenantId: string) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          // List of models that have tenantId and require isolation
          const tenantModels = [
            'User', 
            'Student', 
            'Class', 
            'Subject', 
            'AcademicYear', 
            'Term',
            'Grade',
            'Attendance',
            'Assignment',
            'AssignmentSubmission',
            'TimetablePeriod'
          ];

          if (tenantModels.includes(model)) {
            const argsAny = args as Record<string, unknown>;

            // Write operations: Inject tenantId
            if (operation === 'create') {
               if (!argsAny.data) argsAny.data = {};
               argsAny.data.tenantId = tenantId;
            } else if (operation === 'createMany') {
               if (Array.isArray(argsAny.data)) {
                  argsAny.data.forEach((item: Record<string, unknown>) => (item as Record<string, unknown>).tenantId = tenantId);
               } else {
                  argsAny.data.tenantId = tenantId;
               }
            } else if (operation !== 'findUnique' && operation !== 'findUniqueOrThrow') {
                // Read/Update/Delete operations: Inject tenantId into where clause
                if (!argsAny.where) argsAny.where = {};
                argsAny.where.tenantId = tenantId;
            }
          }
          return query(args);
        }
      }
    }
  });
}

export type TenantClient = ReturnType<typeof getTenantDb>;
