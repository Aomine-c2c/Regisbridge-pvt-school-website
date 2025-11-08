import { POST } from '../register/route'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as db from '@/lib/db'

// Mock dependencies
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
jest.mock('@/lib/db')

describe('POST /api/auth/register', () => {
  const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
  const mockJwt = jwt as jest.Mocked<typeof jwt>
  const mockDb = db as jest.Mocked<typeof db>

  beforeEach(() => {
    jest.clearAllMocks()
    mockBcrypt.hash.mockResolvedValue('hashedPassword123' as never)
    mockJwt.sign.mockReturnValue('mock-jwt-token' as never)
    mockDb.createUserInDB.mockResolvedValue({
      id: 'user_123',
      email: 'test@example.com',
      password: 'hashedPassword123',
      firstName: 'John',
      lastName: 'Doe',
      role: 'student',
      grade: 'Grade 5',
      studentId: 'STU001',
      phoneNumber: null,
      status: 'active',
      permissions: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })

  describe('Successful Registration', () => {
    it('should register a new student user successfully', async () => {
      const requestBody = {
        email: 'student@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        grade: 'Grade 5',
        studentId: 'STU001',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.message).toBe('User registered successfully')
      expect(data.user).toBeDefined()
      expect(data.user.email).toBe(requestBody.email)
      expect(data.user.password).toBeUndefined() // Password should not be returned
      expect(data.token).toBe('mock-jwt-token')
      expect(data.refreshToken).toBe('mock-jwt-token')
    })

    it('should register a teacher user without grade/studentId', async () => {
      const requestBody = {
        email: 'teacher@example.com',
        password: 'SecurePass123!',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.user.role).toBe('teacher')
      expect(data.user.grade).toBeUndefined()
      expect(data.user.studentId).toBeUndefined()
    })

    it('should default role to student if not provided', async () => {
      const requestBody = {
        email: 'defaultrole@example.com',
        password: 'SecurePass123!',
        firstName: 'Default',
        lastName: 'User',
        grade: 'Grade 3',
        studentId: 'STU002',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.user.role).toBe('student')
    })
  })

  describe('Validation Errors', () => {
    it('should reject registration with invalid email', async () => {
      const requestBody = {
        email: 'invalid-email',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        grade: 'Grade 5',
        studentId: 'STU001',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('email')
    })

    it('should reject registration with short password', async () => {
      const requestBody = {
        email: 'test@example.com',
        password: 'short',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        grade: 'Grade 5',
        studentId: 'STU001',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('password')
      expect(data.message).toContain('8')
    })

    it('should reject registration with missing required fields', async () => {
      const requestBody = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        // Missing firstName and lastName
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toBeDefined()
    })

    it('should reject student registration without grade', async () => {
      const requestBody = {
        email: 'student@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        studentId: 'STU001',
        // Missing grade
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('grade')
    })

    it('should reject student registration without studentId', async () => {
      const requestBody = {
        email: 'student@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        grade: 'Grade 5',
        // Missing studentId
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('studentId')
    })

    it('should reject registration with invalid role', async () => {
      const requestBody = {
        email: 'test@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        role: 'invalid-role',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('role')
    })
  })

  describe('Duplicate Email Handling', () => {
    it('should reject registration with duplicate email (case insensitive)', async () => {
      // First registration
      const firstRequest = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'duplicate@example.com',
          password: 'SecurePass123!',
          firstName: 'First',
          lastName: 'User',
          role: 'teacher',
        }),
      })

      await POST(firstRequest)

      // Second registration with same email (different case)
      const secondRequest = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'DUPLICATE@example.com',
          password: 'SecurePass456!',
          firstName: 'Second',
          lastName: 'User',
          role: 'teacher',
        }),
      })

      const response = await POST(secondRequest)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.success).toBe(false)
      expect(data.message).toContain('already exists')
    })
  })

  describe('Password Security', () => {
    it('should hash password before storing', async () => {
      const requestBody = {
        email: 'security@example.com',
        password: 'PlainTextPassword123!',
        firstName: 'Security',
        lastName: 'Test',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      expect(mockBcrypt.hash).toHaveBeenCalledWith(requestBody.password, 10)
    })

    it('should not return password in response', async () => {
      const requestBody = {
        email: 'nopassword@example.com',
        password: 'SecurePass123!',
        firstName: 'No',
        lastName: 'Password',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.user.password).toBeUndefined()
      expect(data.user.email).toBe(requestBody.email)
    })
  })

  describe('Token Generation', () => {
    it('should generate JWT and refresh tokens', async () => {
      const requestBody = {
        email: 'tokens@example.com',
        password: 'SecurePass123!',
        firstName: 'Token',
        lastName: 'Test',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(mockJwt.sign).toHaveBeenCalledTimes(2)
      expect(data.token).toBe('mock-jwt-token')
      expect(data.refreshToken).toBe('mock-jwt-token')
    })
  })

  describe('Database Integration', () => {
    it('should persist user to database when available', async () => {
      const requestBody = {
        email: 'dbtest@example.com',
        password: 'SecurePass123!',
        firstName: 'Database',
        lastName: 'Test',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      expect(mockDb.createUserInDB).toHaveBeenCalled()
    })

    it('should handle database errors gracefully', async () => {
      mockDb.createUserInDB.mockRejectedValueOnce(new Error('Database error'))

      const requestBody = {
        email: 'dberror@example.com',
        password: 'SecurePass123!',
        firstName: 'DB',
        lastName: 'Error',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)

      // Should still succeed using in-memory storage
      expect(response.status).toBe(201)
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid JSON body', async () => {
      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: 'invalid-json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should handle unexpected errors gracefully', async () => {
      mockBcrypt.hash.mockRejectedValueOnce(new Error('Unexpected error'))

      const requestBody = {
        email: 'error@example.com',
        password: 'SecurePass123!',
        firstName: 'Error',
        lastName: 'Test',
        role: 'teacher',
      }

      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.message).toBeDefined()
    })
  })
})
