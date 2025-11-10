import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { config } from '@/lib/config'
import { checkRateLimit, rateLimitPresets } from '@/lib/rate-limit'
import { secureResponse } from '@/lib/security-headers'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting: 10 verification attempts per 15 minutes
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.api)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return secureResponse(
        { success: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.secret
      ) as any

      return secureResponse({
        success: true,
        data: {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        },
      })
    } catch (err) {
      return secureResponse(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return secureResponse(
      { success: false, message: 'Token verification failed' },
      { status: 500 }
    )
  }
}
