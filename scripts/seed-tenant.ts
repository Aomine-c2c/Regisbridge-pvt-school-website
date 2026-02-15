/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Tenant Seeding...');

  // 1. Create Default Tenant
  const defaultTenantSlug = 'default-school';
  let tenant = await prisma.tenant.findUnique({
    where: { slug: defaultTenantSlug }
  });

  if (!tenant) {
    console.log(`Creating default tenant: ${defaultTenantSlug}...`);
    tenant = await prisma.tenant.create({
      data: {
        name: 'Default School',
        slug: defaultTenantSlug,
        primaryColor: '#0f172a',
        secondaryColor: '#3b82f6',
        features: {
            create: {
                enableFinance: true,
                enableHR: true,
                enableTransport: false,
                enableHostel: false,
                enableLibrary: false
            }
        }
      }
    });
    console.log(`✅ Default tenant created: ${tenant.id}`);
  } else {
    console.log(`ℹ️ Default tenant already exists: ${tenant.id}`);
  }

  // 2. Migrate Existing Users
  const usersWithoutTenant = await prisma.user.findMany({
    where: { tenantId: null }
  });

  console.log(`Found ${usersWithoutTenant.length} users without tenant.`);

  if (usersWithoutTenant.length > 0) {
    const updateResult = await prisma.user.updateMany({
      where: { tenantId: null },
      data: { tenantId: tenant.id }
    });
    console.log(`✅ Migrated ${updateResult.count} users to tenant ${defaultTenantSlug}.`);
  }

  console.log('🎉 Tenant seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
