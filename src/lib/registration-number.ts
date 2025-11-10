/**
 * Student Registration Number Generator
 * 
 * Generates unique student registration numbers in format:
 * REG-{YEAR}-{SEQUENCE}
 * 
 * Example: REG-2025-0001, REG-2025-0002, etc.
 * 
 * Features:
 * - Year-based numbering (resets each academic year)
 * - Zero-padded sequence numbers (0001, 0002, etc.)
 * - Configurable prefix and padding
 * - Collision detection and retry logic
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const isDbEnabled = Boolean(process.env.DATABASE_URL)

export interface RegNumberConfig {
  prefix?: string        // Default: 'REG'
  yearFormat?: 'full' | 'short'  // Default: 'full' (2025 vs 25)
  sequencePadding?: number       // Default: 3 (001, 002, etc.)
  separator?: string              // Default: '-'
}

const DEFAULT_CONFIG: Required<RegNumberConfig> = {
  prefix: 'REG',
  yearFormat: 'short',
  sequencePadding: 3,
  separator: '',
}

/**
 * Generate the next available registration number
 * @param config - Configuration for registration number format
 * @returns Promise<string> - The generated registration number
 */
export async function generateRegistrationNumber(
  config: RegNumberConfig = {}
): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const { prefix, yearFormat, sequencePadding, separator } = finalConfig
  
  // Get current year
  const now = new Date()
  const currentYear = now.getFullYear()
  const yearStr = yearFormat === 'short' 
    ? currentYear.toString().slice(-2)
    : currentYear.toString()
  
  // Build pattern for current year
  const pattern = `${prefix}${separator}${yearStr}${separator}`
  
  // If database not available, generate with timestamp
  if (!isDbEnabled) {
    const timestamp = Date.now().toString().slice(-sequencePadding)
    return `${pattern}${timestamp.padStart(sequencePadding, '0')}`
  }
  
  try {
    // Find highest sequence number for current year
    // @ts-ignore - Student model may not exist until migration runs
    const students = await prisma.student.findMany({
      where: {
        rollNumber: {
          startsWith: pattern,
        },
      },
      select: {
        rollNumber: true,
      },
      orderBy: {
        rollNumber: 'desc',
      },
      take: 1,
    })
    
    let nextSequence = 1
    
    if (students.length > 0) {
      // Extract sequence number from last registration number
      const lastRegNumber = students[0].rollNumber
      const sequenceStr = lastRegNumber.split(separator).pop()
      
      if (sequenceStr) {
        const lastSequence = parseInt(sequenceStr, 10)
        if (!isNaN(lastSequence)) {
          nextSequence = lastSequence + 1
        }
      }
    }
    
    // Format sequence with zero-padding
    const sequenceStr = nextSequence.toString().padStart(sequencePadding, '0')
    
    // Build final registration number
    const registrationNumber = `${pattern}${sequenceStr}`
    
    return registrationNumber
  } catch (error) {
    console.error('Error generating registration number:', error)
    
    // Fallback: Generate with timestamp to ensure uniqueness
    const timestamp = Date.now().toString().slice(-6)
    return `${prefix}${separator}${yearStr}${separator}${timestamp}`
  }
}

/**
 * Generate registration number with retry on collision
 * @param config - Configuration for registration number format
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @returns Promise<string> - The generated registration number
 */
export async function generateUniqueRegistrationNumber(
  config: RegNumberConfig = {},
  maxRetries: number = 3
): Promise<string> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const regNumber = await generateRegistrationNumber(config)
    
    // Check if number already exists
    // @ts-ignore - Student model may not exist until migration runs
    const existing = await prisma.student.findUnique({
      where: { rollNumber: regNumber },
    })
    
    if (!existing) {
      return regNumber
    }
    
    // If collision detected, wait a bit and retry
    await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)))
  }
  
  // Last resort: Add random suffix
  const regNumber = await generateRegistrationNumber(config)
  const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${regNumber}${config.separator || '-'}${randomSuffix}`
}

/**
 * Validate registration number format
 * @param regNumber - Registration number to validate
 * @param config - Configuration used to generate the number
 * @returns boolean - True if valid format
 */
export function isValidRegistrationNumber(
  regNumber: string,
  config: RegNumberConfig = {}
): boolean {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const { prefix, separator, sequencePadding } = finalConfig
  
  // Build regex pattern
  // Example: REG-2025-001 or REG-25-001
  const yearPattern = finalConfig.yearFormat === 'short' ? '\\d{2}' : '\\d{4}'
  const sequencePattern = `\\d{${sequencePadding}}`
  const pattern = new RegExp(
    `^${prefix}${separator}${yearPattern}${separator}${sequencePattern}$`
  )
  
  return pattern.test(regNumber)
}

/**
 * Parse registration number into components
 * @param regNumber - Registration number to parse
 * @param config - Configuration used to generate the number
 * @returns Object with prefix, year, and sequence
 */
export function parseRegistrationNumber(
  regNumber: string,
  config: RegNumberConfig = {}
): { prefix: string; year: string; sequence: string } | null {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const { separator } = finalConfig
  
  const parts = regNumber.split(separator)
  
  if (parts.length !== 3) {
    return null
  }
  
  return {
    prefix: parts[0],
    year: parts[1],
    sequence: parts[2],
  }
}

/**
 * Get statistics about registration numbers for a given year
 * @param year - Academic year (e.g., 2025)
 * @param config - Configuration for registration number format
 * @returns Promise<{ total: number; lastNumber: string | null }>
 */
export async function getRegistrationStats(
  year?: number,
  config: RegNumberConfig = {}
): Promise<{ total: number; lastNumber: string | null; nextNumber: string }> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const { prefix, yearFormat, separator } = finalConfig
  
  const currentYear = year || new Date().getFullYear()
  const yearStr = yearFormat === 'short' 
    ? currentYear.toString().slice(-2)
    : currentYear.toString()
  
  const pattern = `${prefix}${separator}${yearStr}${separator}`
  
  try {
    // @ts-ignore - Student model may not exist until migration runs
    const students = await prisma.student.findMany({
      where: {
        rollNumber: {
          startsWith: pattern,
        },
      },
      select: {
        rollNumber: true,
      },
      orderBy: {
        rollNumber: 'desc',
      },
    })
    
    const total = students.length
    const lastNumber = students.length > 0 ? students[0].rollNumber : null
    const nextNumber = await generateRegistrationNumber(config)
    
    return {
      total,
      lastNumber,
      nextNumber,
    }
  } catch (error) {
    console.error('Error getting registration stats:', error)
    return {
      total: 0,
      lastNumber: null,
      nextNumber: await generateRegistrationNumber(config),
    }
  }
}

/**
 * Bulk generate registration numbers
 * @param count - Number of registration numbers to generate
 * @param config - Configuration for registration number format
 * @returns Promise<string[]> - Array of generated registration numbers
 */
export async function bulkGenerateRegistrationNumbers(
  count: number,
  config: RegNumberConfig = {}
): Promise<string[]> {
  const numbers: string[] = []
  
  for (let i = 0; i < count; i++) {
    const regNumber = await generateUniqueRegistrationNumber(config)
    numbers.push(regNumber)
  }
  
  return numbers
}
