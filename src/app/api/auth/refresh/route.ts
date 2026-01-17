import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, generateAccessToken } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { refreshToken } = body

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Refresh token required' },
        { status: 400 }
      )
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken)

    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired refresh token' },
        { status: 401 }
      )
    }

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    })

    if (!user || user.status !== 'active') {
      return NextResponse.json(
        { success: false, message: 'User not found or inactive' },
        { status: 401 }
      )
    }

    // Generate new access token
    const newAccessToken = await generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
