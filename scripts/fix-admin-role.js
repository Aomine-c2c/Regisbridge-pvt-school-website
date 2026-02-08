const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAdminRole() {
  try {
    const updated = await prisma.user.updateMany({
      where: { email: 'admin@regisbridge.edu' },
      data: { role: 'admin' }, // Force lowercase
    });
    console.log(`Updated ${updated.count} users. Admin role fixed.`);
  } catch (error) {
    console.error('Error updating role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminRole();
