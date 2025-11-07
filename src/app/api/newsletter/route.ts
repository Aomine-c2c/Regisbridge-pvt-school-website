import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const newsletterSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100),
  interests: Joi.array().items(Joi.string()),
})

// In-memory storage for subscribers (replace with DB in production)
const subscribers = new Set()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const { error, value } = newsletterSchema.validate(body)
    if (error) {
      return NextResponse.json(
        { success: false, message: error.details[0].message },
        { status: 400 }
      )
    }

    const { email, name, interests } = value

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'This email is already subscribed to our newsletter' 
        },
        { status: 409 }
      )
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase())

    // Send welcome email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY) {
      const welcomeEmail = {
        to: email,
        from: process.env.FROM_EMAIL || 'newsletter@regisbridge.ac.zw',
        subject: 'Welcome to Regisbridge School Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1C1A75;">Welcome to Our Newsletter!</h2>
            <p>Dear ${name || 'Subscriber'},</p>
            <p>Thank you for subscribing to the Regisbridge School newsletter.</p>
            <p>You'll receive updates about:</p>
            <ul>
              <li>School events and activities</li>
              <li>Academic achievements</li>
              <li>Important announcements</li>
              <li>Admission information</li>
            </ul>
            <p>We're excited to keep you informed about all the wonderful things happening at Regisbridge!</p>
            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>Regisbridge Private School</strong><br>
              <em>Supervincimus - We Conquer Together</em>
            </p>
          </div>
        `,
        text: `
Welcome to Regisbridge School Newsletter

Dear ${name || 'Subscriber'},

Thank you for subscribing to the Regisbridge School newsletter.

You'll receive updates about:
- School events and activities
- Academic achievements
- Important announcements
- Admission information

We're excited to keep you informed about all the wonderful things happening at Regisbridge!

Best regards,
Regisbridge Private School
Supervincimus - We Conquer Together
        `.trim(),
      }

      await sgMail.send(welcomeEmail)
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.',
    })
  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    
    if (error.response?.body) {
      console.error('SendGrid error:', error.response.body)
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to subscribe. Please try again later.' 
      },
      { status: 500 }
    )
  }
}
