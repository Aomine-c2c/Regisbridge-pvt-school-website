/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { verifyAuth, requireAdmin } from '../auth-middleware'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'test-secret-key'

describe('Auth Middleware', () => {
  describe('verifyAuth', () => {
    it('should verify valid token and return user data', async () => {
      const token = jwt.sign(
        { id: '123', email: 'test@test.com', role: 'user' },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const user = await verifyAuth(request)
      expect(user).toBeDefined()
      expect(user?.id).toBe('123')
      expect(user?.email).toBe('test@test.com')
      expect(user?.role).toBe('user')
    })

    it('should return null for missing token', async () => {
      const request = new NextRequest('http://localhost:3000/api/test')
      const user = await verifyAuth(request)
      expect(user).toBeNull()
    })

    it('should return null for invalid token format', async () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          Authorization: 'InvalidFormat',
        },
      })

      const user = await verifyAuth(request)
      expect(user).toBeNull()
    })

    it('should return null for expired token', async () => {
      const token = jwt.sign(
        { id: '123', email: 'test@test.com' },
        JWT_SECRET,
        { expiresIn: '-1h' } // Expired 1 hour ago
      )

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const user = await verifyAuth(request)
      expect(user).toBeNull()
    })

    it('should return null for malformed JWT', async () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          Authorization: 'Bearer invalid.token.here',
        },
      })

      const user = await verifyAuth(request)
      expect(user).toBeNull()
    })
  })

  describe('requireAdmin', () => {
    it('should allow admin users', async () => {
      const token = jwt.sign(
        { id: '123', email: 'admin@test.com', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      const request = new NextRequest('http://localhost:3000/api/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const user = await requireAdmin(request)
      expect(user).toBeDefined()
      expect(user?.role).toBe('admin')
    })

    it('should throw error for non-admin users', async () => {
      const token = jwt.sign(
        { id: '123', email: 'user@test.com', role: 'user' },
        JWT_SECRET,
        { expiresIn: '1h' }
      )

      const request = new NextRequest('http://localhost:3000/api/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await expect(requireAdmin(request)).rejects.toThrow('Admin access required')
    })

    it('should throw error for missing authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin')

      await expect(requireAdmin(request)).rejects.toThrow('Authentication required')
    })

    it('should throw error for invalid token', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin', {
        headers: {
          Authorization: 'Bearer invalid.token',
        },
      })

      await expect(requireAdmin(request)).rejects.toThrow('Authentication required')
    })
  })
})
