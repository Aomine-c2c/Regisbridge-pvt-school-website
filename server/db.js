// Lightweight DB wrapper: uses Prisma when DATABASE_URL is set, otherwise no-op
import { PrismaClient } from '@prisma/client'

let prisma = null
const isDbEnabled = Boolean(process.env.DATABASE_URL)

if (isDbEnabled) {
  prisma = new PrismaClient()
}

export async function createUserInDB(user) {
  if (!prisma) return null
  try {
    const data = {
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      grade: user.grade || null,
      studentId: user.studentId || null,
      phoneNumber: user.phoneNumber || null,
      status: user.status || 'active',
      permissions: user.permissions || null,
    }
    return await prisma.user.create({ data })
  } catch (err) {
    // Ignore unique constraint errors during seed
    console.error('Prisma createUser error:', err.message || err)
    return null
  }
}

export async function findUserByEmailInDB(email) {
  if (!prisma) return null
  return await prisma.user.findUnique({ where: { email } })
}

export async function getAllUsersFromDB() {
  if (!prisma) return []
  return await prisma.user.findMany()
}

export async function findUserByIdInDB(id) {
  if (!prisma) return null
  return await prisma.user.findUnique({ where: { id } })
}

export async function findUsersWithFilters({ role, status, search, page = 1, limit = 10 } = {}) {
  if (!prisma) return []
  const where = {}
  if (role) where.role = role
  if (status) where.status = status
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }
  const take = parseInt(limit)
  const skip = (parseInt(page) - 1) * take
  const total = await prisma.user.count({ where })
  const data = await prisma.user.findMany({ where, take, skip, orderBy: { createdAt: 'desc' } })
  return { data, total }
}

export async function updateUserInDB(id, updates) {
  if (!prisma) return null
  return await prisma.user.update({ where: { id }, data: updates })
}

export async function deleteUserInDB(id) {
  if (!prisma) return null
  return await prisma.user.delete({ where: { id } })
}

export function getDbClient() {
  return prisma
}
