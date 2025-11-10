/**
 * Rate Limiting Middleware
 * 
 * Protects API endpoints from brute force attacks and abuse.
 * Uses in-memory storage for development, should use Redis in production.
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (use Redis in production for multi-instance deployments)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitOptions {
  /**
   * Time window in milliseconds
   * @default 900000 (15 minutes)
   */
  windowMs?: number;
  
  /**
   * Maximum number of requests per window
   * @default 10
   */
  maxRequests?: number;
  
  /**
   * Custom key generator (defaults to IP address)
   */
  keyGenerator?: (request: NextRequest) => string;
  
  /**
   * Custom error message
   */
  message?: string;
  
  /**
   * Skip rate limiting for certain conditions
   */
  skip?: (request: NextRequest) => boolean;
}

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  // Check common proxy headers first
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a constant for development
  return 'unknown';
}

/**
 * Default key generator using IP address
 */
function defaultKeyGenerator(request: NextRequest): string {
  const ip = getClientIp(request);
  const path = new URL(request.url).pathname;
  return `${ip}:${path}`;
}

/**
 * Check if request should be rate limited
 * @returns NextResponse with 429 status if rate limited, null otherwise
 */
export function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions = {}
): NextResponse | null {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxRequests = 10,
    keyGenerator = defaultKeyGenerator,
    message = 'Too many requests, please try again later.',
    skip,
  } = options;
  
  // Skip rate limiting if specified
  if (skip && skip(request)) {
    return null;
  }
  
  const key = keyGenerator(request);
  const now = Date.now();
  
  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetAt < now) {
    // Create new entry or reset expired one
    entry = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(key, entry);
    
    // Add rate limit headers
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', (maxRequests - 1).toString());
    response.headers.set('X-RateLimit-Reset', new Date(entry.resetAt).toISOString());
    
    return null; // Allow request
  }
  
  // Increment request count
  entry.count++;
  
  // Check if limit exceeded
  if (entry.count > maxRequests) {
    const resetInSeconds = Math.ceil((entry.resetAt - now) / 1000);
    
    return NextResponse.json(
      {
        success: false,
        message,
        retryAfter: resetInSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': resetInSeconds.toString(),
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(entry.resetAt).toISOString(),
        },
      }
    );
  }
  
  // Update entry in store
  rateLimitStore.set(key, entry);
  
  return null; // Allow request
}

/**
 * Rate limiter middleware wrapper
 * Usage: Wrap your API route handler with this function
 */
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: RateLimitOptions = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Check rate limit
    const rateLimitResponse = checkRateLimit(request, options);
    
    if (rateLimitResponse) {
      return rateLimitResponse; // Return 429 if rate limited
    }
    
    // Continue with handler
    return handler(request);
  };
}

/**
 * Preset configurations for common scenarios
 */
export const rateLimitPresets = {
  // Strict limit for authentication endpoints (brute force protection)
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },
  
  // Moderate limit for API endpoints
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
    message: 'API rate limit exceeded. Please slow down.',
  },
  
  // Relaxed limit for read-only endpoints
  readOnly: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    message: 'Rate limit exceeded. Please try again soon.',
  },
  
  // Very strict for sensitive operations
  sensitive: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 attempts per hour
    message: 'Too many attempts. Please try again in 1 hour.',
  },
} as const;

/**
 * Clear rate limit for a specific key (useful for testing or manual reset)
 */
export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Get current rate limit stats for a key
 */
export function getRateLimitStats(key: string): RateLimitEntry | null {
  return rateLimitStore.get(key) || null;
}

export default {
  checkRateLimit,
  withRateLimit,
  rateLimitPresets,
  clearRateLimit,
  getRateLimitStats,
};
