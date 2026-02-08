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

    // Find the last user with this prefix pattern in their studentId
    // We use studentId field as the generic Registration Number
    const lastUser = await prisma.user.findFirst({
        where: {
            studentId: {
                startsWith: basePattern
            }
        },
        orderBy: {
            studentId: 'desc'
        },
        select: {
            studentId: true
        }
    })

    let sequence = 1
    if (lastUser && lastUser.studentId) {
        // Extract the sequence part (last 3 digits)
        const lastSequenceStr = lastUser.studentId.slice(basePattern.length)
        const lastSequence = parseInt(lastSequenceStr, 10)
        if (!isNaN(lastSequence)) {
            sequence = lastSequence + 1
        }
    }

    // Pad with zeros to ensure 3 digits (e.g., 001, 012, 123)
    const sequenceStr = sequence.toString().padStart(3, '0')
    
    return `${basePattern}${sequenceStr}`
}
