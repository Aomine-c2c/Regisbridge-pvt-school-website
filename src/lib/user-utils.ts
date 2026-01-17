/**
 * User data utility functions
 * Handles sanitization, validation, and transformation of user data
 */

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  grade?: string | null
  studentId?: string | null
  phoneNumber?: string | null
  status?: string
  permissions?: any
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface UserWithPassword extends User {
  password: string
}

/**
 * Remove sensitive fields from user object
 * @param user User object with potential sensitive data
 * @returns Sanitized user object without password
 */
export function sanitizeUser<T extends Partial<UserWithPassword>>(user: T): Omit<T, 'password'> {
  const { password, ...sanitized } = user
  return sanitized
}

/**
 * Remove sensitive fields from array of users
 * @param users Array of user objects
 * @returns Array of sanitized users
 */
export function sanitizeUsers<T extends Partial<UserWithPassword>>(users: T[]): Omit<T, 'password'>[] {
  return users.map(sanitizeUser)
}

/**
 * Normalize email to lowercase and trim whitespace
 * @param email Email address
 * @returns Normalized email
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

/**
 * Normalize name fields (trim and capitalize first letter)
 * @param name Name string
 * @returns Normalized name
 */
export function normalizeName(name: string): string {
  const trimmed = name.trim()
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
}

/**
 * Validate email format
 * @param email Email address
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number format (basic)
 * @param phone Phone number
 * @returns True if valid phone format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+()]{10,}$/
  return phoneRegex.test(phone)
}

/**
 * Get user display name
 * @param user User object
 * @returns Full name or email if names not available
 */
export function getUserDisplayName(user: Partial<User>): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`
  }
  if (user.firstName) return user.firstName
  if (user.lastName) return user.lastName
  return user.email || 'Unknown User'
}

/**
 * Get user initials
 * @param user User object
 * @returns User initials (2 characters)
 */
export function getUserInitials(user: Partial<User>): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  }
  if (user.firstName) return user.firstName.substring(0, 2).toUpperCase()
  if (user.email) return user.email.substring(0, 2).toUpperCase()
  return 'U'
}

/**
 * Check if user has admin role
 * @param user User object
 * @returns True if user is admin
 */
export function isAdmin(user: Partial<User> | null): boolean {
  return user?.role === 'admin'
}

/**
 * Check if user has teacher role
 * @param user User object
 * @returns True if user is teacher
 */
export function isTeacher(user: Partial<User> | null): boolean {
  return user?.role === 'teacher'
}

/**
 * Check if user has student role
 * @param user User object
 * @returns True if user is student
 */
export function isStudent(user: Partial<User> | null): boolean {
  return user?.role === 'student'
}

/**
 * Check if user is active
 * @param user User object
 * @returns True if user status is active
 */
export function isActiveUser(user: Partial<User> | null): boolean {
  return user?.status === 'active' || !user?.status // Default to active if no status
}

/**
 * Format user data for API response
 * @param user User object from database
 * @returns Formatted user object
 */
export function formatUserForAPI(user: UserWithPassword): User {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    grade: user.grade || null,
    studentId: user.studentId || null,
    phoneNumber: user.phoneNumber || null,
    status: user.status || 'active',
    permissions: user.permissions || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

/**
 * Prepare user data for database insertion
 * @param userData Raw user data from form/API
 * @returns Normalized user data ready for DB
 */
export function prepareUserForDB(userData: Partial<UserWithPassword>): Partial<UserWithPassword> {
  const prepared: Partial<UserWithPassword> = {
    ...userData,
  }

  if (userData.email) {
    prepared.email = normalizeEmail(userData.email)
  }

  if (userData.firstName) {
    prepared.firstName = normalizeName(userData.firstName)
  }

  if (userData.lastName) {
    prepared.lastName = normalizeName(userData.lastName)
  }

  if (userData.phoneNumber) {
    prepared.phoneNumber = userData.phoneNumber.trim() || null
  }

  if (userData.grade) {
    prepared.grade = userData.grade.trim() || null
  }

  if (userData.studentId) {
    prepared.studentId = userData.studentId.trim() || null
  }

  return prepared
}

/**
 * Filter users by role
 * @param users Array of users
 * @param role Role to filter by
 * @returns Filtered users
 */
export function filterUsersByRole(users: User[], role: string): User[] {
  return users.filter(user => user.role === role)
}

/**
 * Filter users by status
 * @param users Array of users
 * @param status Status to filter by
 * @returns Filtered users
 */
export function filterUsersByStatus(users: User[], status: string): User[] {
  return users.filter(user => (user.status || 'active') === status)
}

/**
 * Search users by query string
 * @param users Array of users
 * @param query Search query
 * @returns Matching users
 */
export function searchUsers(users: User[], query: string): User[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return users

  return users.filter(user => {
    const searchFields = [
      user.firstName?.toLowerCase(),
      user.lastName?.toLowerCase(),
      user.email?.toLowerCase(),
      user.studentId?.toLowerCase(),
      user.phoneNumber?.toLowerCase(),
    ].filter(Boolean)

    return searchFields.some(field => field?.includes(lowerQuery))
  })
}

/**
 * Sort users by field
 * @param users Array of users
 * @param field Field to sort by
 * @param order Sort order
 * @returns Sorted users
 */
export function sortUsers(
  users: User[], 
  field: keyof User = 'createdAt', 
  order: 'asc' | 'desc' = 'desc'
): User[] {
  return [...users].sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]

    if (aVal === undefined || aVal === null) return 1
    if (bVal === undefined || bVal === null) return -1

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal)
    }

    if (aVal instanceof Date && bVal instanceof Date) {
      return order === 'asc' 
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime()
    }

    return 0
  })
}

/**
 * Validate user data completeness
 * @param user User object
 * @returns Object with validation result and missing fields
 */
export function validateUserCompleteness(user: Partial<User>): {
  isComplete: boolean
  missingFields: string[]
} {
  const requiredFields: (keyof User)[] = ['email', 'firstName', 'lastName', 'role']
  const missingFields = requiredFields.filter(field => !user[field])

  return {
    isComplete: missingFields.length === 0,
    missingFields,
  }
}
