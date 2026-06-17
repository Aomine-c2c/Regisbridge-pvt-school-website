/**
 * Student & Staff Registration Number Generator
 * 
 * Generates unique registration numbers in formats:
 * Students: RS{YEAR}{SEQUENCE} (e.g., RS25001)
 * Teachers: RT{YEAR}{SEQUENCE} (e.g., RT25001)
 * 
 * Features:
 * - Entity-based prefixes (RS, RT)
 * - Year-based numbering (resets each academic year)
 * - Zero-padded sequence numbers
 * - No separators (compact format)
 * - Collision detection
 */

import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/db';

const isDbEnabled = true; // Use shared prisma instance

export type UserRole = 'student' | 'teacher' | 'staff'

export interface RegNumberConfig {
  role?: UserRole        // Determines prefix: student->RS, teacher->RT
  yearFormat?: 'full' | 'short'  // Default: 'short' (25 vs 2025)
  sequencePadding?: number       // Default: 3 (001, 002, etc.)
}

const ROLE_PREFIXES: Record<string, string> = {
  student: 'RS',
  teacher: 'RT',
  staff: 'RF', // Default for other staff
  admin: 'RA'
}

const DEFAULT_CONFIG: Required<RegNumberConfig> = {
  role: 'student',
  yearFormat: 'short',
  sequencePadding: 3,
}

/**
 * Generate the next available registration number
 */
export async function generateRegistrationNumber(
  config: RegNumberConfig = {},
  db: PrismaClient  = prisma
): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const { role, yearFormat, sequencePadding } = finalConfig
  
  const prefix = ROLE_PREFIXES[role] || 'REG'
  
  // Get current year
  const now = new Date()
  const currentYear = now.getFullYear()
  const yearStr = yearFormat === 'short' 
    ? currentYear.toString().slice(-2)
    : currentYear.toString()
  
  // Build pattern: PREFIX + YEAR (e.g., RS25)
  const pattern = `${prefix}${yearStr}`
  
  // If database not available, generate with timestamp
  if (!isDbEnabled) {
    const timestamp = Date.now().toString().slice(-sequencePadding)
    return `${pattern}${timestamp.padStart(sequencePadding, '0')}`
  }
  
  try {
    // Determine which table to check based on role
    
    let lastSequence = 0

    if (role === 'student') {
        // Check Student table
        const students = await db.student.findMany({
            where: { admissionIdentifier: { startsWith: pattern } },
            select: { admissionIdentifier: true },
            orderBy: { admissionIdentifier: 'desc' },
            take: 1,
        })
        if (students.length > 0) {
            lastSequence = extractSequence(students[0].admissionIdentifier, pattern)
        }
    } else {
        // For Teachers/Staff, check StaffProfile table
        // Employees (Teachers and Staff) both need IDs.
        
        let lastId = ''
        
        if (role === 'teacher') {
             // Check if teacherProfile exists on db instance (it might be strict typed, so use any if needed for now or just trust it)
             const teachers = await db.teacherProfile.findMany({
                 where: { employeeId: { startsWith: pattern } },
                 select: { employeeId: true },
                 orderBy: { employeeId: 'desc' },
                 take: 1
             })
             if (teachers.length > 0) lastId = teachers[0].employeeId
        } else {
             const staff = await db.staffProfile.findMany({
                 where: { employeeId: { startsWith: pattern } },
                 select: { employeeId: true },
                 orderBy: { employeeId: 'desc' },
                 take: 1,
             })
             if (staff.length > 0) lastId = staff[0].employeeId
        }

        if (lastId) {
            lastSequence = extractSequence(lastId, pattern)
        }
    }
    
    const nextSequence = lastSequence + 1
    const sequenceStr = nextSequence.toString().padStart(sequencePadding, '0')
    
    return `${pattern}${sequenceStr}`

  } catch (error) {
    console.error('Error generating registration number:', error)
    const timestamp = Date.now().toString().slice(-sequencePadding)
    return `${pattern}${timestamp}`
  }
}

function extractSequence(fullNumber: string, prefixPattern: string): number {
    try {
        const seqPart = fullNumber.replace(prefixPattern, '')
        const seq = parseInt(seqPart, 10)
        return isNaN(seq) ? 0 : seq
    } catch {
        return 0
    }
}

/**
 * Generate unique number with retry
 */
export async function generateUniqueRegistrationNumber(
  config: RegNumberConfig = {},
  db: PrismaClient  = prisma,
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const regNumber = await generateRegistrationNumber(config, db)
    
    // Check uniqueness
    let exists = false
    if (config.role === 'student') {
        const found = await db.student.findUnique({ where: { admissionIdentifier: regNumber } })
        exists = !!found
    } else {
        const user = await db.user.findFirst({ where: { email: regNumber } })
        exists = !!user
        // Actually, we should check the same field we generated from.
        if (config.role === 'teacher') {
             const t = await db.teacherProfile.findUnique({ where: { employeeId: regNumber } })
             exists = !!t
        } else {
             const s = await db.staffProfile.findUnique({ where: { employeeId: regNumber } })
             exists = !!s
        }
    }
    
    if (!exists) return regNumber
    
    await new Promise(resolve => setTimeout(resolve, 50 * (attempt + 1)))
  }
  
  // Create randomized fallback
  const base = await generateRegistrationNumber(config, db)
  const random = Math.floor(Math.random() * 99).toString().padStart(2, '0')
  return `${base}${random}`
}

/**
 * Get stats
 */
export async function getRegistrationStats(_year?: number, db: PrismaClient  = prisma) {
    // Simplified stats for now
    return {
        total: 0,
        nextStudent: await generateRegistrationNumber({ role: 'student' }, db),
        nextTeacher: await generateRegistrationNumber({ role: 'teacher' }, db)
    }
}

// Keep legacy exports for compatibility if needed, but updated
export const isValidRegistrationNumber = (reg: string) => /^[A-Z]{2}\d{5,}$/.test(reg)
export const parseRegistrationNumber = (reg: string) => ({ prefix: reg.slice(0,2), year: reg.slice(2,4), sequence: reg.slice(4) })
export const bulkGenerateRegistrationNumbers = async (count: number, config: RegNumberConfig, db: PrismaClient  = prisma) => {
    const nums = []
    for(let i=0; i<count; i++) nums.push(await generateUniqueRegistrationNumber(config, db))
    return nums
}
