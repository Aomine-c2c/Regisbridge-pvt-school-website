import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { config } from '@/lib/config'
import { checkRateLimit, rateLimitPresets } from '@/lib/rate-limit'
import { secureResponse } from '@/lib/security-headers'

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
})

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 20 refresh attempts per 15 minutes
    const rateLimitResponse = checkRateLimit(request, rateLimitPresets.api)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const body = await request.json()

    // Validate input
    const { error, value } = refreshSchema.validate(body)
    if (error) {
      return secureResponse(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { refreshToken } = value

    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret
      ) as any

      // Ensure it's a refresh token
      if (decoded.type !== 'refresh') {
        return secureResponse(
          { success: false, message: 'Invalid token type' },
          { status: 401 }
        )
      }

      // Generate new access token
      const newAccessToken = jwt.sign(
        { 
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role 
        },
        config.jwt.secret,
        { expiresIn: '7d' }
      )

      // Optionally generate new refresh token (rotation)
      const newRefreshToken = jwt.sign(
        { userId: decoded.userId, type: 'refresh' },
        config.jwt.refreshSecret,
        { expiresIn: '30d' }
      )

      return secureResponse({
        success: true,
        message: 'Token refreshed successfully',
        data: {
          token: newAccessToken,
          refreshToken: newRefreshToken,
        },
      })
    } catch (err) {
      return secureResponse(
        { success: false, message: 'Invalid or expired refresh token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Token refresh error:', error)
    return secureResponse(
      { success: false, message: 'Failed to refresh token' },
      { status: 500 }
    )
  }
}
