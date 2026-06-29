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

  console.log('Base data seeding completed!')
}

async function seedRBAC() {
  const roles: { name: string; description?: string; permissions: string[] }[] = [
    {
      name: 'owner',
      description: 'Full platform access with billing and tenant management',
      permissions: [
        'dashboard.view',
        'users.view',
        'users.create',
        'users.update',
        'users.delete',
        'roles.view',
        'roles.manage',
        'finance.view',
        'finance.manage',
        'reports.view',
        'settings.manage',
        'audit.view',
        'academics.view',
        'academics.manage',
      ],
    },
    {
      name: 'admin',
      description: 'School operations access without tenant-level billing controls',
      permissions: [
        'dashboard.view',
        'users.view',
        'users.create',
        'users.update',
        'teachers.view',
        'students.view',
        'attendance.manage',
        'assignments.manage',
        'exams.manage',
        'timetables.manage',
        'finance.view',
        'finance.manage',
        'reports.view',
        'notifications.send',
        'library.manage',
        'hostel.manage',
      ],
    },
    {
      name: 'teacher',
      description: 'Classroom-focused access for teaching and grading',
      permissions: [
        'dashboard.view',
        'students.view',
        'attendance.mark',
        'attendance.view',
        'assignments.view',
        'assignments.create',
        'assignments.grade',
        'exams.view',
        'grades.view',
        'grades.update',
        'timetable.view',
        'messages.send',
        'notifications.view',
      ],
    },
  ]

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description || '' },
      create: {
        name: role.name,
        description: role.description || '',
        isSystem: true,
        permissions: {
          create: role.permissions.map((slug) => ({
            permission: {
              connectOrCreate: {
                where: { slug },
                create: {
                  slug,
                  description: slug,
                  group: slug.split('.')[0],
                },
              },
            },
          })),
        },
      },
    })
  }

  console.log('RBAC roles and permissions seeded.')
}

async function main() {
  console.log('Starting RBAC seed...')
  await seedRBAC()
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
