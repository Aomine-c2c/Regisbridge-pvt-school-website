/**
 * @jest-environment @edge-runtime/jest-environment
 */

import { POST } from '../route'
import { NextRequest } from 'next/server'
import sgMail from '@sendgrid/mail'

// Mock SendGrid
jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}))

describe('POST /api/newsletter', () => {
  const mockSgMail = sgMail as jest.Mocked<typeof sgMail>
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
    mockSgMail.send.mockResolvedValue([{ statusCode: 202, body: {}, headers: {} }] as any)
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Successful Subscriptions', () => {
    it('should subscribe email successfully', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'subscriber@example.com',
        name: 'John Doe',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('successfully subscribed')
      expect(mockSgMail.send).toHaveBeenCalledTimes(1)
    })

    it('should subscribe with email only (no name)', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'noname@example.com',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockSgMail.send).toHaveBeenCalled()
      
      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).toContain('Subscriber')
    })

    it('should subscribe with interests', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'interests@example.com',
        name: 'Jane Smith',
        interests: ['academics', 'sports', 'boarding'],
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should handle subscription when SendGrid not configured', async () => {
      delete process.env.SENDGRID_API_KEY

      const requestBody = {
        email: 'nosg@example.com',
        name: 'No SendGrid',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockSgMail.send).not.toHaveBeenCalled()
    })
  })

  describe('Duplicate Subscription Handling', () => {
    it('should reject duplicate email subscription', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'duplicate@example.com',
        name: 'First Subscriber',
      }

      // First subscription
      const firstRequest = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
      await POST(firstRequest)

      // Second subscription with same email
      const secondRequest = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
      const response = await POST(secondRequest)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.success).toBe(false)
      expect(data.message).toContain('already subscribed')
    })

    it('should handle duplicate email with different case', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      // First subscription
      const firstRequest = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: 'casetest@example.com',
          name: 'First',
        }),
      })
      await POST(firstRequest)

      // Second subscription with different case
      const secondRequest = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: 'CASETEST@example.com',
          name: 'Second',
        }),
      })
      const response = await POST(secondRequest)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.success).toBe(false)
      expect(data.message).toContain('already subscribed')
    })
  })

  describe('Validation Errors', () => {
    it('should reject invalid email', async () => {
      const requestBody = {
        email: 'invalid-email',
        name: 'Test User',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('email')
    })

    it('should reject missing email', async () => {
      const requestBody = {
        name: 'Test User',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('email')
    })

    it('should reject name that is too short', async () => {
      const requestBody = {
        email: 'test@example.com',
        name: 'J',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('name')
    })

    it('should reject name that is too long', async () => {
      const requestBody = {
        email: 'test@example.com',
        name: 'A'.repeat(101),
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('name')
    })
  })

  describe('Welcome Email Content', () => {
    it('should send welcome email with correct details', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'
      process.env.FROM_EMAIL = 'newsletter@regisbridge.ac.zw'

      const requestBody = {
        email: 'welcome@example.com',
        name: 'Welcome Test',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      expect(mockSgMail.send).toHaveBeenCalledTimes(1)
      
      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.to).toBe('welcome@example.com')
      expect(emailData.from).toBe('newsletter@regisbridge.ac.zw')
      expect(emailData.subject).toContain('Welcome')
      expect(emailData.html).toContain('Welcome Test')
      expect(emailData.html).toContain('Regisbridge School')
    })

    it('should personalize email with subscriber name', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'personalized@example.com',
        name: 'Personalized Name',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).toContain('Personalized Name')
      expect(emailData.text).toContain('Personalized Name')
    })

    it('should use default from email when not configured', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'
      delete process.env.FROM_EMAIL

      const requestBody = {
        email: 'default@example.com',
        name: 'Default Test',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.from).toBe('newsletter@regisbridge.ac.zw')
    })

    it('should include both HTML and text versions', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'formats@example.com',
        name: 'Format Test',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).toBeDefined()
      expect(emailData.html).toContain('<h2')
      expect(emailData.html).toContain('<ul')
      expect(emailData.text).toBeDefined()
      expect(emailData.text).toContain('Format Test')
    })

    it('should include school motto in email', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'motto@example.com',
        name: 'Motto Test',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).toContain('Supervincimus')
      expect(emailData.html).toContain('We Conquer Together')
    })
  })

  describe('Error Handling', () => {
    it('should handle SendGrid API errors', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'
      mockSgMail.send.mockRejectedValueOnce({
        response: {
          body: { errors: [{ message: 'Invalid API key' }] },
        },
      })

      const requestBody = {
        email: 'error@example.com',
        name: 'Error Test',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.message).toContain('Failed to subscribe')
    })

    it('should handle invalid JSON body', async () => {
      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: 'invalid-json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should handle unexpected errors', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'
      mockSgMail.send.mockRejectedValueOnce(new Error('Unexpected error'))

      const requestBody = {
        email: 'unexpected@example.com',
        name: 'Unexpected Error',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('Email Normalization', () => {
    it('should normalize email to lowercase for duplicate detection', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      // First subscription
      const firstRequest = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: 'Normal@Example.COM',
          name: 'First',
        }),
      })
      await POST(firstRequest)

      // Verify it was stored in lowercase by trying to subscribe again
      const secondRequest = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: 'normal@example.com',
          name: 'Second',
        }),
      })
      const response = await POST(secondRequest)

      expect(response.status).toBe(409)
    })

    it('should preserve original email case in welcome email', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        email: 'CamelCase@Example.com',
        name: 'Case Preservation',
      }

      const request = new NextRequest('http://localhost/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.to).toBe('CamelCase@Example.com')
    })
  })
})
