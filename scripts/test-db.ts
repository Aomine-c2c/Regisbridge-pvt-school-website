import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing DB connection...');
    const tenant = await prisma.tenant.findUnique({
      where: { slug: 'default-school' },
    });
    console.log('Tenant found:', tenant ? 'Yes' : 'No');
    if (tenant) {
      console.log('Tenant ID:', tenant.id);
      const features = await prisma.tenantFeatures.findUnique({
        where: { tenantId: tenant.id }
      });
      console.log('Features found:', features ? 'Yes' : 'No');
    }
  } catch (error) {
    console.error('DB Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
