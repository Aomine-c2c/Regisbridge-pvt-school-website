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
      email: user.email.toLowerCase().trim(), // Normalize email
      password: user.password,
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      role: user.role,
      grade: user.grade || null,
      studentId: user.studentId || null,
      phoneNumber: user.phoneNumber || null,
      status: user.status || 'active',
      permissions: user.permissions || null,
    }
    return await prisma.user.create({ data })
  } catch (err: any) {
    // Handle unique constraint violations
    if (err.code === 'P2002') {
      console.error('Duplicate email:', user.email)
      throw new Error('User with this email already exists')
    }
    console.error('Prisma createUser error:', err.message || err)
    throw err
  }
}

export async function findUserByEmailInDB(email: string) {
  if (!prisma) return null
  try {
    return await prisma.user.findUnique({ 
      where: { email: email.toLowerCase().trim() } 
    })
  } catch (err: any) {
    console.error('Prisma findUserByEmail error:', err.message || err)
    return null
  }
}

export async function getAllUsersFromDB() {
  if (!prisma) return []
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (err: any) {
    console.error('Prisma getAllUsers error:', err.message || err)
    return []
  }
}

export async function findUserByIdInDB(id: string) {
  if (!prisma) return null
  try {
    return await prisma.user.findUnique({ where: { id } })
  } catch (err: any) {
    console.error('Prisma findUserById error:', err.message || err)
    return null
  }
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
  
  try {
    const where: any = {}
    
    if (role) where.role = role
    if (status) where.status = status
    
    if (search) {
      const searchTerm = search.trim()
      where.OR = [
        { firstName: { contains: searchTerm, mode: 'insensitive' } },
        { lastName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { studentId: { contains: searchTerm, mode: 'insensitive' } },
      ]
    }
    
    const take = Math.min(parseInt(String(limit)), 100) // Max 100 per page
    const skip = (parseInt(String(page)) - 1) * take
    
    const [total, data] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({ 
        where, 
        take, 
        skip, 
        orderBy: { createdAt: 'desc' } 
      })
    ])
    
    return { data, total }
  } catch (err: any) {
    console.error('Prisma findUsersWithFilters error:', err.message || err)
    return { data: [], total: 0 }
  }
}

export async function updateUserInDB(id: string, updates: Partial<User>) {
  if (!prisma) return null
  
  try {
    // Normalize data
    const data: any = { ...updates }
    if (data.email) data.email = data.email.toLowerCase().trim()
    if (data.firstName) data.firstName = data.firstName.trim()
    if (data.lastName) data.lastName = data.lastName.trim()
    
    return await prisma.user.update({ 
      where: { id }, 
      data 
    })
  } catch (err: any) {
    // Handle unique constraint violations
    if (err.code === 'P2002') {
      console.error('Duplicate email on update:', updates.email)
      throw new Error('Email already in use by another user')
    }
    // Handle not found
    if (err.code === 'P2025') {
      console.error('User not found for update:', id)
      return null
    }
    console.error('Prisma updateUser error:', err.message || err)
    throw err
  }
}

export async function deleteUserInDB(id: string) {
  if (!prisma) return false
  
  try {
    await prisma.user.delete({ where: { id } })
    return true
  } catch (err: any) {
    // Handle not found
    if (err.code === 'P2025') {
      console.error('User not found for deletion:', id)
      return false
    }
    console.error('Prisma deleteUser error:', err.message || err)
    throw err
  }
}

export function getDbClient() {
  return prisma
}
