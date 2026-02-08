import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@regisbridge.edu'
  const password = 'Admin123!'
  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'admin',
    },
    create: {
      email,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'ACTIVE',
      grade: '12', // Example grade
      studentId: 'ADMIN001'
    },
  })

  console.log({ admin })

  // --- Transport Module ---
  const bus1 = await prisma.vehicle.upsert({
    where: { registrationNumber: 'BUS-001' },
    update: {},
    create: {
      registrationNumber: 'BUS-001',
      capacity: 40,
      model: 'Tata Starbus',
      status: 'ACTIVE',
      driverName: 'Rajesh Kumar',
      driverPhone: '9876543210',
    },
  })

  const route1 = await prisma.route.upsert({
    where: { id: 'route-001' }, // ID is used for upsert here as name isn't unique in schema but could be
    update: {},
    create: {
      id: 'route-001',
      name: 'Route 1: City Center',
      startLocation: 'School Campus',
      endLocation: 'City Center Mall',
      stops: JSON.stringify(['Campus', 'Main St', 'Park Ave', 'City Center']),
      schedule: '07:30 AM - 03:30 PM',
      distance: 12.5,
    },
  })

  // --- Library Module ---
  const book1 = await prisma.book.upsert({
    where: { isbn: '978-0131103627' },
    update: {},
    create: {
      title: 'The C Programming Language',
      author: 'Brian W. Kernighan, Dennis M. Ritchie',
      isbn: '978-0131103627',
      category: 'Computer Science',
      publisher: 'Prentice Hall',
      publicationYear: 1988,
      copies: 5,
      available: 5,
      location: 'Shelf A1',
      status: 'AVAILABLE',
    },
  })

  // --- Hostel Module ---
  const boysBlock = await prisma.hostelBlock.create({
    data: {
      name: 'Block A (Boys)',
      type: 'BOYS',
      capacity: 100,
      rooms: {
        create: [
          {
            roomNumber: '101',
            capacity: 4,
            floor: 1,
            beds: {
              create: [
                { bedNumber: '101-A' },
                { bedNumber: '101-B' },
              ]
            }
          }
        ]
      }
    }
  })

  // --- Exams Module ---
  const examSession = await prisma.examSession.create({
    data: {
      name: 'Finals 2024',
      academicYear: '2023-2024',
      term: 'Spring',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-05-15'),
      status: 'UPCOMING',
    }
  })

  // --- HR Module ---
  // Create a staff user first
  const staffEmail = 'teacher@regisbridge.edu'
  const staffUser = await prisma.user.upsert({
    where: { email: staffEmail },
    update: {},
    create: {
      email: staffEmail,
      password: hashedPassword,
      firstName: 'Sarah',
      lastName: 'Teacher',
      role: 'teacher',
      status: 'ACTIVE',
    },
  })

  await prisma.staffProfile.upsert({
    where: { userId: staffUser.id },
    update: {},
    create: {
      userId: staffUser.id,
      designation: 'Senior Teacher',
      department: 'Science',
      joinDate: new Date('2020-01-15'),
      basicSalary: 50000,
      contractType: 'PERMANENT',
    }
  })

  console.log('Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
