/**
 * Standardized API Response Utilities
 * Provides consistent error handling and response formatting across the application
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Creates a standardized success response
 */
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
  }
}

/**
 * Creates a standardized error response
 */
export function errorResponse(
  message: string,
  statusCode: number = 500,
  details?: any
): { response: ApiResponse; status: number } {
  return {
    response: {
      success: false,
      message,
      error: message,
      ...(details && { details }),
    },
    status: statusCode,
  }
}

/**
 * Common error messages
 */
export const ErrorMessages = {
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Invalid input data',
  SERVER_ERROR: 'An unexpected error occurred',
  FORBIDDEN: 'Access forbidden',
  BAD_REQUEST: 'Bad request',
  CONFLICT: 'Resource already exists',
}

/**
 * HTTP Status Codes
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
}

/**
 * Handles API errors consistently across the frontend
 */
export function handleApiError(error: any): string {
  if (error instanceof ApiError) {
    return error.message
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error?.message) {
    return error.message
  }
  
  return ErrorMessages.SERVER_ERROR
}
