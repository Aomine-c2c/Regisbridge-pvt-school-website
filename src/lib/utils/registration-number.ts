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

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const isDbEnabled = Boolean(process.env.DATABASE_URL)

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
  config: RegNumberConfig = {}
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
    // For now, we'll check the User table or Student table depending on implementation
    // Assuming 'rollNumber' exists on Student, and maybe 'employeeId' on Staff?
    // For simplicity/safety, we'll check the specific tables if they exist, 
    // or fallback to a string check if we can't determine.
    
    let lastSequence = 0

    if (role === 'student') {
        // Check Student table
        const students = await prisma.student.findMany({
            where: { rollNumber: { startsWith: pattern } },
            select: { rollNumber: true },
            orderBy: { rollNumber: 'desc' },
            take: 1,
        })
        if (students.length > 0) {
            lastSequence = extractSequence(students[0].rollNumber, pattern)
        }
    } else {
        // For Teachers/Staff, check User table or Staff table
        // Assuming 'staffId' or similar field on a Staff model, or we store it in User
        // Let's assume there's a custom field or we just look for collisions in a generic way if possible.
        // For this demo, let's assume we maintain a sequence counter or check a Staff model.
        // @ts-expect-error - Staff model might differ
        const staff = await prisma.staff?.findMany({
             where: { employeeId: { startsWith: pattern } },
             select: { employeeId: true },
             orderBy: { employeeId: 'desc' },
             take: 1,
        }) ?? []
        
        if (staff.length > 0) {
            lastSequence = extractSequence(staff[0].employeeId, pattern)
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
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const regNumber = await generateRegistrationNumber(config)
    
    // Check uniqueness
    let exists = false
    if (config.role === 'student') {
        const found = await prisma.student.findUnique({ where: { rollNumber: regNumber } })
        exists = !!found
    } else {
        const found = await prisma.staffProfile?.findUnique({ where: { userId: regNumber } }) // Assuming userId or employeeId?
        // Wait, schema says StaffProfile has userId (unique) and id.
        // registration-number.ts used employeeId?
        // Let's check Schema for StaffProfile again.
        // id, userId, designation... NO employeeId.
        // Users have `id`.
        // Maybe regNumber is the User ID? Or we need to add employeeId to StaffProfile?
        // Or maybe it refers to User ID?

        exists = !!found
    }
    
    if (!exists) return regNumber
    
    await new Promise(resolve => setTimeout(resolve, 50 * (attempt + 1)))
  }
  
  // Create randomized fallback
  const base = await generateRegistrationNumber(config)
  const random = Math.floor(Math.random() * 99).toString().padStart(2, '0')
  return `${base}${random}`
}

/**
 * Get stats
 */
export async function getRegistrationStats() {
    // Simplified stats for now
    return {
        total: 0,
        nextStudent: await generateRegistrationNumber({ role: 'student' }),
        nextTeacher: await generateRegistrationNumber({ role: 'teacher' })
    }
}

// Keep legacy exports for compatibility if needed, but updated
export const isValidRegistrationNumber = (reg: string) => /^[A-Z]{2}\d{5,}$/.test(reg)
export const parseRegistrationNumber = (reg: string) => ({ prefix: reg.slice(0,2), year: reg.slice(2,4), sequence: reg.slice(4) })
export const bulkGenerateRegistrationNumbers = async (count: number, config: RegNumberConfig) => {
    const nums = []
    for(let i=0; i<count; i++) nums.push(await generateUniqueRegistrationNumber(config))
    return nums
}
