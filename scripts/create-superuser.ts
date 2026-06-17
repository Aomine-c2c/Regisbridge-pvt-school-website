
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'superuser@regisbridge.edu'
  const password = 'RegisbridgeSuper123!'
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log(`Checking for existing superuser with email: ${email}...`)

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
      tenantId: null
    }
  })

  let user;

  if (existingUser) {
    console.log(`Updating existing superuser (ID: ${existingUser.id})...`)
    user = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
        role: 'SUPERUSER',
        firstName: 'Super',
        lastName: 'User',
        status: 'ACTIVE',
      }
    })
  } else {
    console.log(`Creating new superuser...`)
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'User',
        role: 'SUPERUSER',
        status: 'ACTIVE',
        tenantId: null, 
      }
    })
  }

  console.log(`✅ Superuser configured successfully!`)
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
  console.log(`Role: ${user.role}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
