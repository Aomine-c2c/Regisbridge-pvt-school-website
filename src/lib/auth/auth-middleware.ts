// Auth middleware utilities
import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from '../auth-service'

export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await verifyAccessToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  return payload
}

export function withAuth(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const result = await authMiddleware(request)
    if (result instanceof NextResponse) {
      return result
    }
    return handler(request, result)
  }
}
