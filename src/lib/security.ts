import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

function rateLimit(request: NextRequest, limit: number = 100, windowMs: number = 15 * 60 * 1000) {
  const ip = getClientIP(request)
  const now = Date.now()

  // Clean up old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }

  const current = rateLimitStore.get(ip)
  
  if (!current) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return { success: true }
  }

  if (current.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return { success: true }
  }

  if (current.count >= limit) {
    return { 
      success: false, 
      resetTime: current.resetTime,
      remaining: 0 
    }
  }

  current.count++
  return { 
    success: true, 
    remaining: limit - current.count,
    resetTime: current.resetTime 
  }
}

export function withRateLimit(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 minutes

    const result = rateLimit(request, maxRequests, windowMs)

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((result.resetTime! - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': result.resetTime!.toString(),
            'Retry-After': Math.ceil((result.resetTime! - Date.now()) / 1000).toString()
          }
        }
      )
    }

    const response = await handler(request)
    
    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', result.remaining!.toString())
    response.headers.set('X-RateLimit-Reset', result.resetTime!.toString())

    return response
  }
}

// Security headers middleware
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy (basic)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'"
  )
  
  // Strict Transport Security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  return response
}

// Input validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

// Database query logging for security
export async function secureDbQuery<T>(
  query: () => Promise<T>,
  operation: string
): Promise<T> {
  try {
    const result = await query()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ DB Operation successful: ${operation}`)
    }
    
    return result
  } catch (error) {
    console.error(`❌ DB Operation failed: ${operation}`, error)
    throw error
  }
}
