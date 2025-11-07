import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback-secret-key'
      ) as any

      return NextResponse.json({
        success: true,
        data: {
          userId: decoded.userId,
          email: decoded.email,
          role: decoded.role,
        },
      })
    } catch (err) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Token verification failed' },
      { status: 500 }
    )
  }
}
