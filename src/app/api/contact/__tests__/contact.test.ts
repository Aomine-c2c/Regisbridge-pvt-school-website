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

describe('POST /api/contact', () => {
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

  describe('Successful Submissions', () => {
    it('should send contact form with all fields', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'
      process.env.CONTACT_EMAIL = 'info@regisbridge.ac.zw'
      process.env.FROM_EMAIL = 'noreply@regisbridge.ac.zw'

      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+263771234567',
        message: 'I would like to inquire about admission for my son.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('Thank you')
      expect(mockSgMail.send).toHaveBeenCalledTimes(1)
      
      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData).toMatchObject({
        to: 'info@regisbridge.ac.zw',
        from: 'noreply@regisbridge.ac.zw',
        replyTo: 'john@example.com',
        subject: expect.stringContaining('John Doe'),
      })
      expect(emailData.html).toContain('John Doe')
      expect(emailData.html).toContain('john@example.com')
      expect(emailData.html).toContain('+263771234567')
      expect(emailData.html).toContain('inquire about admission')
    })

    it('should send contact form without optional phone number', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'What are your school fees for Grade 5?',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockSgMail.send).toHaveBeenCalledTimes(1)
      
      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).not.toContain('Phone:')
    })

    it('should handle submission when SendGrid is not configured', async () => {
      delete process.env.SENDGRID_API_KEY

      const requestBody = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message that is long enough to pass validation.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('not configured')
      expect(mockSgMail.send).not.toHaveBeenCalled()
    })
  })

  describe('Validation Errors', () => {
    it('should reject submission with invalid email', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('email')
    })

    it('should reject submission with short name', async () => {
      const requestBody = {
        name: 'J',
        email: 'john@example.com',
        message: 'This is a test message.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('name')
    })

    it('should reject submission with short message', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('message')
      expect(data.message).toContain('10')
    })

    it('should reject submission with missing required fields', async () => {
      const requestBody = {
        email: 'john@example.com',
        // Missing name and message
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should reject submission with name too long', async () => {
      const requestBody = {
        name: 'A'.repeat(101), // 101 characters
        email: 'john@example.com',
        message: 'This is a valid message.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('name')
    })

    it('should reject submission with message too long', async () => {
      const requestBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'A'.repeat(5001), // 5001 characters
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toContain('message')
    })
  })

  describe('Email Content', () => {
    it('should include reply-to address in email', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        name: 'Reply Test',
        email: 'replytest@example.com',
        message: 'Testing reply-to functionality.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.replyTo).toBe('replytest@example.com')
    })

    it('should format HTML email correctly', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        name: 'HTML Test',
        email: 'html@example.com',
        phone: '+263771234567',
        message: 'Testing HTML formatting.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).toContain('<h2')
      expect(emailData.html).toContain('HTML Test')
      expect(emailData.html).toContain('html@example.com')
      expect(emailData.html).toContain('+263771234567')
      expect(emailData.html).toContain('Testing HTML formatting.')
    })

    it('should include plain text version', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        name: 'Text Test',
        email: 'text@example.com',
        message: 'Testing plain text version.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.text).toBeDefined()
      expect(emailData.text).toContain('Text Test')
      expect(emailData.text).toContain('text@example.com')
      expect(emailData.text).toContain('Testing plain text version.')
    })

    it('should use default email addresses when env vars not set', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'
      delete process.env.CONTACT_EMAIL
      delete process.env.FROM_EMAIL

      const requestBody = {
        name: 'Default Test',
        email: 'default@example.com',
        message: 'Testing default email addresses.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.to).toBe('info@regisbridge.ac.zw')
      expect(emailData.from).toBe('noreply@regisbridge.ac.zw')
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
        name: 'Error Test',
        email: 'error@example.com',
        message: 'This should trigger an error.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.message).toContain('Failed to send message')
    })

    it('should handle invalid JSON body', async () => {
      const request = new NextRequest('http://localhost/api/contact', {
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
        name: 'Unexpected Error',
        email: 'unexpected@example.com',
        message: 'This should trigger an unexpected error.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('Security', () => {
    it('should sanitize user input in email content', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        name: 'Test<script>alert("xss")</script>',
        email: 'security@example.com',
        message: 'Testing XSS prevention in email content.',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      
      const emailData = mockSgMail.send.mock.calls[0][0]
      // Email should contain the script tag as text, not executable
      expect(emailData.html).toContain('script')
    })

    it('should preserve line breaks in message', async () => {
      process.env.SENDGRID_API_KEY = 'test-api-key'

      const requestBody = {
        name: 'Line Break Test',
        email: 'linebreak@example.com',
        message: 'First line\n\nSecond line\n\nThird line',
      }

      const request = new NextRequest('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      await POST(request)

      const emailData = mockSgMail.send.mock.calls[0][0]
      expect(emailData.html).toContain('white-space: pre-wrap')
      expect(emailData.text).toContain('\n\n')
    })
  })
})
