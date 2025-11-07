// Lightweight DB wrapper: uses Prisma when DATABASE_URL is set, otherwise no-op
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null
const isDbEnabled = Boolean(process.env.DATABASE_URL)

if (isDbEnabled) {
  prisma = new PrismaClient()
}

interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  grade?: string | null
  studentId?: string | null
  phoneNumber?: string | null
  status?: string
  permissions?: any
}

export async function createUserInDB(user: User) {
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
  } catch (err: any) {
    console.error('Prisma createUser error:', err.message || err)
    return null
  }
}

export async function findUserByEmailInDB(email: string) {
  if (!prisma) return null
  return await prisma.user.findUnique({ where: { email } })
}

export async function getAllUsersFromDB() {
  if (!prisma) return []
  return await prisma.user.findMany()
}

export async function findUserByIdInDB(id: string) {
  if (!prisma) return null
  return await prisma.user.findUnique({ where: { id } })
}

interface FindUsersFilters {
  role?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}

export async function findUsersWithFilters({ role, status, search, page = 1, limit = 10 }: FindUsersFilters = {}) {
  if (!prisma) return { data: [], total: 0 }
  const where: any = {}
  if (role) where.role = role
  if (status) where.status = status
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }
  const take = parseInt(String(limit))
  const skip = (parseInt(String(page)) - 1) * take
  const total = await prisma.user.count({ where })
  const data = await prisma.user.findMany({ where, take, skip, orderBy: { createdAt: 'desc' } })
  return { data, total }
}

export async function updateUserInDB(id: string, updates: Partial<User>) {
  if (!prisma) return null
  return await prisma.user.update({ where: { id }, data: updates })
}

export async function deleteUserInDB(id: string) {
  if (!prisma) return null
  return await prisma.user.delete({ where: { id } })
}

export function getDbClient() {
  return prisma
}
