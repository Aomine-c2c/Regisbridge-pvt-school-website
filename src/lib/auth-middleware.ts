import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export interface AuthUser {
  userId: string
  email: string
  role: string
}

export async function verifyAuth(request: NextRequest): Promise<{ user: AuthUser | null; error: NextResponse | null }> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      ),
    }
  }

  const token = authHeader.substring(7)

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret-key'
    ) as AuthUser

    return { user: decoded, error: null }
  } catch (err) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      ),
    }
  }
}

export async function requireAdmin(request: NextRequest): Promise<{ user: AuthUser | null; error: NextResponse | null }> {
  const { user, error } = await verifyAuth(request)
  
  if (error) return { user: null, error }
  
  if (user?.role !== 'admin') {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      ),
    }
  }

  return { user, error: null }
}
