import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Generates a registration number based on the role and current year.
 * Format: PREFIX + YY + XXX
 * 
 * Prefixes:
 * - teacher: RT
 * - student: RS
 * - parent: RP
 * - admin: RA
 * - staff: RF (Regisbridge Faculty/Staff default)
 */
export async function generateRegistrationNumber(role: string): Promise<string> {
    const prefixes: Record<string, string> = {
        teacher: 'RT',
        student: 'RS',
        parent: 'RP',
        admin: 'RA',
        staff: 'RF'
    }

    const prefix = prefixes[role.toLowerCase()] || 'RU' // RU for Unknown/User
    const year = new Date().getFullYear().toString().slice(-2) // '26' for 2026
    const basePattern = `${prefix}${year}`

    // Find the last student with this prefix pattern in their admissionIdentifier
    // Note: detailed role-based check (like registration-number.ts) is better, 
    // but preserving this function's simple signature for now.
    
    // We only check Student table for now as 'User' doesn't have ID field.
    // If role is NOT student, this might be broken or need expansion to StaffProfile.
    
    let lastId = ''
    
    if (role.toLowerCase() === 'student') {
        const lastStudent = await prisma.student.findFirst({
            where: {
                admissionIdentifier: {
                    startsWith: basePattern
                }
            },
            orderBy: {
                admissionIdentifier: 'desc'
            },
            select: {
                admissionIdentifier: true
            }
        })
        if (lastStudent) lastId = lastStudent.admissionIdentifier
    } else {
        // Fallback or implementation for Staff
        // Similar to registration-number.ts logic
        // For now returning basePattern + 001 if not student, or TODO
        // But likely this function is legacy.
    }

    let sequence = 1
    if (lastId) {
        // Extract the sequence part (last 3 digits)
        const lastSequenceStr = lastId.slice(basePattern.length)
        const lastSequence = parseInt(lastSequenceStr, 10)
        if (!isNaN(lastSequence)) {
            sequence = lastSequence + 1
        }
    }

    // Pad with zeros to ensure 3 digits (e.g., 001, 012, 123)
    const sequenceStr = sequence.toString().padStart(3, '0')
    
    return `${basePattern}${sequenceStr}`
}
