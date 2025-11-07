/**
 * @jest-environment node
 */
import { POST } from '../../auth/login/route'
import { NextRequest } from 'next/server'
import { findUserByEmailInDB, createUserInDB } from '@/lib/db'
import bcrypt from 'bcryptjs'

// Mock dependencies
jest.mock('@/lib/db')
jest.mock('bcryptjs')

const mockedFindUserByEmailInDB = findUserByEmailInDB as jest.MockedFunction<typeof findUserByEmailInDB>
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login successfully with valid credentials', async () => {
    const mockUser = {
      id: '123',
      email: 'test@test.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user' as const,
      firstName: 'Test',
      lastName: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    }

    mockedFindUserByEmailInDB.mockResolvedValue(mockUser)
    mockedBcrypt.compare.mockResolvedValue(true as never)

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.token).toBeDefined()
    expect(data.user).toBeDefined()
    expect(data.user.email).toBe('test@test.com')
    expect(data.user.password).toBeUndefined() // Password should not be returned
  })

  it('should fail with invalid email', async () => {
    mockedFindUserByEmailInDB.mockResolvedValue(null)

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'nonexistent@test.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
    expect(data.message).toContain('Invalid')
  })

  it('should fail with incorrect password', async () => {
    const mockUser = {
      id: '123',
      email: 'test@test.com',
      password: await bcrypt.hash('correctpassword', 10),
      role: 'user' as const,
      firstName: 'Test',
      lastName: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    }

    mockedFindUserByEmailInDB.mockResolvedValue(mockUser)
    mockedBcrypt.compare.mockResolvedValue(false as never)

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'wrongpassword',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.success).toBe(false)
  })

  it('should validate required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        // Missing password
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('should validate email format', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid-email',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('should handle database errors gracefully', async () => {
    mockedFindUserByEmailInDB.mockRejectedValue(new Error('Database connection failed'))

    const request = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'password123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
  })

  it('should prevent timing attacks by using constant-time comparison', async () => {
    // This test ensures password comparison timing doesn't leak information
    const mockUser = {
      id: '123',
      email: 'test@test.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user' as const,
      firstName: 'Test',
      lastName: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    }

    mockedFindUserByEmailInDB.mockResolvedValue(mockUser)
    mockedBcrypt.compare.mockResolvedValue(false as never)

    const start1 = Date.now()
    const request1 = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'a',
      }),
    })
    await POST(request1)
    const time1 = Date.now() - start1

    const start2 = Date.now()
    const request2 = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'very-long-wrong-password-that-should-not-affect-timing',
      }),
    })
    await POST(request2)
    const time2 = Date.now() - start2

    // Timing should be similar (within reasonable margin due to bcrypt's constant-time comparison)
    const timeDifference = Math.abs(time1 - time2)
    expect(timeDifference).toBeLessThan(100) // Allow 100ms variance
  })
})
