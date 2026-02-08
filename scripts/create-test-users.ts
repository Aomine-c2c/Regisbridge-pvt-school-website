import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('Admin123!', 10)

  // Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@regisbridge.edu' },
    update: {},
    create: {
      email: 'student@regisbridge.edu',
      password,
      firstName: 'Test',
      lastName: 'Student',
      role: 'student',
      status: 'ACTIVE',
      grade: '10',
      studentId: 'STU001'
    },
  })
  console.log('Created Student:', student.email)

  // Create Parent
  const parent = await prisma.user.upsert({
    where: { email: 'parent@regisbridge.edu' },
    update: {},
    create: {
      email: 'parent@regisbridge.edu',
      password,
      firstName: 'Test',
      lastName: 'Parent',
      role: 'parent',
      status: 'ACTIVE',
      grade: null,
      studentId: null
    },
  })
  console.log('Created Parent:', parent.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
