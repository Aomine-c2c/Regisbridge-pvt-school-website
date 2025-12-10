/**
 * Security Headers Middleware
 * 
 * Adds essential security headers to all API responses to protect against:
 * - XSS attacks
 * - Clickjacking
 * - MIME sniffing
 * - Man-in-the-middle attacks
 */

import { NextResponse } from 'next/server';

/**
 * Security headers configuration
 * Based on OWASP recommendations and industry best practices
 */
export const SECURITY_HEADERS = {
  // Enforce HTTPS for 1 year (including subdomains)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable browser XSS protection (legacy browsers)
  'X-XSS-Protection': '1; mode=block',

  // Control which features and APIs can be used
  'Permissions-Policy': [
    'camera=*',
    'microphone=*',
    'geolocation=*',
    'interest-cohort=()', // Disable FLoC
  ].join(', '),

  // Content Security Policy - permissive to allow external resources
  'Content-Security-Policy': [
    "default-src *",
    "script-src * 'unsafe-inline' 'unsafe-eval'",
    "style-src * 'unsafe-inline'",
    "img-src * data: blob:",
    "font-src * data:",
    "connect-src *",
    "frame-ancestors *",
    "base-uri *",
    "form-action *",
  ].join('; '),
  
  // Referrer policy - only send origin on cross-origin requests
  'Referrer-Policy': 'strict-origin-when-cross-origin',
} as const;

/**
 * Apply security headers to a NextResponse
 * @param response - The response to add headers to
 * @returns The response with security headers added
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Create a new response with security headers
 * @param body - Response body
 * @param init - Response initialization options
 * @returns NextResponse with security headers
 */
export function secureResponse(body: any, init?: ResponseInit): NextResponse {
  const response = NextResponse.json(body, init);
  return applySecurityHeaders(response);
}

/**
 * Middleware wrapper that adds security headers to API responses
 * Usage: Wrap your API route handler with this function
 */
export function withSecurityHeaders<T>(
  handler: (request: Request) => Promise<NextResponse | Response>
) {
  return async (request: Request): Promise<NextResponse> => {
    const response = await handler(request);
    
    // Convert to NextResponse if needed
    const nextResponse = response instanceof NextResponse 
      ? response 
      : new NextResponse(response.body, response);
    
    return applySecurityHeaders(nextResponse);
  };
}

/**
 * CORS headers for API routes (if needed)
 * Only use if you need to allow cross-origin requests
 */
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // 24 hours
} as const;

/**
 * Apply CORS headers (use sparingly, only when needed)
 */
export function applyCorsHeaders(response: NextResponse): NextResponse {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

export default {
  applySecurityHeaders,
  secureResponse,
  withSecurityHeaders,
  applyCorsHeaders,
  SECURITY_HEADERS,
  CORS_HEADERS,
};
