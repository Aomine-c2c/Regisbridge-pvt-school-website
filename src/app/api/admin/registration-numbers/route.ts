import { NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/api/auth-middleware'
import { secureResponse } from '@/lib/api/security-headers'
import { checkRateLimit, rateLimitPresets } from '@/lib/rate-limit'
import {
  generateUniqueRegistrationNumber,
  getRegistrationStats,
  bulkGenerateRegistrationNumbers,
  isValidRegistrationNumber,
  parseRegistrationNumber,
} from '@/lib/utils/registration-number'

/**
 * GET /api/admin/registration-numbers
 * Get registration number statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.api)
    if (rateLimitResponse) return rateLimitResponse

    // Verify admin access
    const { error } = await requireAdmin(request)
    if (error) return error

    // Get year from query params
    const { searchParams } = new URL(request.url)
    const yearParam = searchParams.get('year')
    const year = yearParam ? parseInt(yearParam, 10) : undefined

    // Get statistics
    const stats = await getRegistrationStats(year)

    return secureResponse({
      success: true,
      data: {
        ...stats,
        currentYear: year || new Date().getFullYear(),
      },
    })
  } catch (error) {
    console.error('Error fetching registration stats:', error)
    return secureResponse(
      { success: false, message: 'Failed to fetch registration statistics' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/registration-numbers
 * Generate new registration number(s)
 * 
 * Body:
 * - count?: number (default: 1) - Number of registration numbers to generate
 * - prefix?: string (default: 'REG')
 * - yearFormat?: 'full' | 'short' (default: 'full')
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.api)
    if (rateLimitResponse) return rateLimitResponse

    // Verify admin access
    const { error } = await requireAdmin(request)
    if (error) return error

    const body = await request.json()
    const {
      count = 1,
      prefix = 'REG',
      yearFormat = 'short',
      sequencePadding = 3,
    } = body

    // Validate count
    if (count < 1 || count > 100) {
      return secureResponse(
        { success: false, message: 'Count must be between 1 and 100' },
        { status: 400 }
      )
    }

    // Generate registration numbers
    const config = { prefix, yearFormat, sequencePadding }

    if (count === 1) {
      const registrationNumber = await generateUniqueRegistrationNumber(config)
      return secureResponse({
        success: true,
        data: {
          registrationNumber,
          config,
        },
      })
    } else {
      const registrationNumbers = await bulkGenerateRegistrationNumbers(count, config)
      return secureResponse({
        success: true,
        data: {
          registrationNumbers,
          count: registrationNumbers.length,
          config,
        },
      })
    }
  } catch (error) {
    console.error('Error generating registration numbers:', error)
    return secureResponse(
      { success: false, message: 'Failed to generate registration numbers' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/registration-numbers/validate
 * Validate registration number format
 * 
 * Body:
 * - registrationNumber: string
 * - prefix?: string (default: 'REG')
 * - yearFormat?: 'full' | 'short' (default: 'full')
 */
export async function PUT(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.api)
    if (rateLimitResponse) return rateLimitResponse

    // Verify admin access
    const { error } = await requireAdmin(request)
    if (error) return error

    const body = await request.json()
    const {
      registrationNumber,
      prefix = 'REG',
      yearFormat = 'short',
      sequencePadding = 3,
    } = body

    if (!registrationNumber) {
      return secureResponse(
        { success: false, message: 'Registration number is required' },
        { status: 400 }
      )
    }

    // Validate format
    const config = { prefix, yearFormat, sequencePadding }
    const isValid = isValidRegistrationNumber(registrationNumber, config)
    const parsed = parseRegistrationNumber(registrationNumber, config)

    return secureResponse({
      success: true,
      data: {
        registrationNumber,
        isValid,
        parsed,
        config,
      },
    })
  } catch (error) {
    console.error('Error validating registration number:', error)
    return secureResponse(
      { success: false, message: 'Failed to validate registration number' },
      { status: 500 }
    )
  }
}
