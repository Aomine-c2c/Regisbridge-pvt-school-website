/**
 * In-memory user storage
 * This is a singleton that persists across hot reloads
 */

interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  permissions?: string[]
  grade?: string
  studentId?: string
  createdAt: string
}

// Singleton in-memory users map
const users = new Map<string, User>()

// Seed default superadmin user (password: Admin@123)
// Pre-hashed with bcrypt
const defaultAdminId = 'superadmin_default_001'
if (!users.has(defaultAdminId)) {
  users.set(defaultAdminId, {
    id: defaultAdminId,
    email: 'admin@regisbridge.ac.zw',
    password: '$2a$10$b2GpYehSM0dsmGINqqdcaueDrTtavfxhgJBXWz13Qbo6zf7YDtKYW', // Admin@123
    firstName: 'Super',
    lastName: 'Admin',
    role: 'superadmin',
    permissions: ['*'], // All permissions
    createdAt: new Date().toISOString(),
  })
  console.log('✓ Default superadmin user seeded:', 'admin@regisbridge.ac.zw')
}

export { users }
export type { User }
