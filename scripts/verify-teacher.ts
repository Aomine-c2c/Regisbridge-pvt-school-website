
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'teacher@regisbridge.edu'
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log(`Checking for user: ${email}...`)

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    console.log(`User found. Updating password...`)
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, role: 'teacher', status: 'ACTIVE' }
    })
    console.log(`Password updated to: ${password}`)
  } else {
    console.log(`User not found. Creating user...`)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        role: 'teacher',
        status: 'ACTIVE'
      }
    })
    console.log(`User created with password: ${password}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
