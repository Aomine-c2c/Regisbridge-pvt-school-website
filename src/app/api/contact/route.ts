import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const contactFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20),
  message: Joi.string().min(10).max(5000).required(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const { error, value } = contactFormSchema.validate(body)
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = value

    // Prepare email content
    const emailData = {
      to: process.env.CONTACT_EMAIL || 'info@regisbridge.ac.zw',
      from: process.env.FROM_EMAIL || 'noreply@regisbridge.ac.zw',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1C1A75;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Sent from Regisbridge School website contact form
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Sent from Regisbridge School website contact form
      `.trim(),
    }

    // Send email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(emailData)
      
      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting us. We will get back to you soon!',
      })
    } else {
      console.warn('SendGrid not configured - would have sent:', emailData)
      
      return NextResponse.json({
        success: true,
        message: 'Message received (email service not configured)',
      })
    }
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    if (error.response?.body) {
      console.error('SendGrid error:', error.response.body)
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    )
  }
}
