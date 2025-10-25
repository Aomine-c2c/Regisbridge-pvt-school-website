/**
 * Regisbridge School Backend API
 * Handles email sending, contact forms, and newsletter subscriptions
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid configured');
} else {
  console.warn('⚠️  SendGrid API key not configured - email sending will fail');
}

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:8080', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
  message: { 
    success: false, 
    message: 'Too many requests, please try again later.' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const emailSchema = Joi.object({
  to: Joi.alternatives().try(
    Joi.string().email(),
    Joi.array().items(Joi.string().email())
  ).required(),
  subject: Joi.string().min(1).max(200).required(),
  html: Joi.string().max(50000),
  text: Joi.string().max(50000),
  from: Joi.string().email(),
  replyTo: Joi.string().email(),
});

const contactFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20),
  message: Joi.string().min(10).max(5000).required(),
});

const newsletterSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().max(100),
});

const applicationSchema = Joi.object({
  studentName: Joi.string().min(2).max(100).required(),
  parentName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(20).required(),
  grade: Joi.string().required(),
  message: Joi.string().max(2000),
});

// Authentication schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid('student', 'parent', 'teacher').required(),
  grade: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  studentId: Joi.string().when('role', {
    is: 'student',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ============================================================================
// AUTHENTICATION UTILITIES
// ============================================================================

// In-memory user storage (replace with database in production)
const users = new Map();

// Helper utilities for working with in-memory users
const findUserByEmail = (email) => {
  if (!email) return undefined;
  const target = email.toLowerCase();
  return Array.from(users.values()).find(u => u.email?.toLowerCase() === target);
};

const isEmailTaken = (email) => Boolean(findUserByEmail(email));

/**
 * Seed admin user for testing
 */
async function seedAdminUser() {
  const existingAdmin = findUserByEmail('admin@regisbridge.edu');
  if (!existingAdmin) {
    try {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      const adminUser = {
        id: 'admin_seed_001',
        email: 'admin@regisbridge.edu',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        password: hashedPassword,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
  users.set(adminUser.id, adminUser);
      console.log('✅ Admin user seeded:');
      console.log('   Email: admin@regisbridge.edu');
      console.log('   Password: Admin123!');
      console.log('');
    } catch (error) {
      console.error('❌ Failed to seed admin user:', error.message);
    }
  }
}

/**
 * Seed superuser for testing
 */
async function seedSuperUser() {
  const existingSuperAdmin = findUserByEmail('superadmin@regisbridge.edu');
  if (!existingSuperAdmin) {
    try {
      const hashedPassword = await bcrypt.hash('SuperAdmin123!', 10);
      const superUser = {
        id: 'superadmin_seed_001',
        email: 'superadmin@regisbridge.edu',
        firstName: 'Super',
        lastName: 'Admin',
        role: 'superadmin',
        password: hashedPassword,
        status: 'active',
        permissions: ['all'], // Full system access
        createdAt: new Date().toISOString(),
      };
      users.set(superUser.id, superUser);
      console.log('✅ Superuser seeded:');
      console.log('   Email: superadmin@regisbridge.edu');
      console.log('   Password: SuperAdmin123!');
      console.log('   Role: superadmin');
      console.log('   Permissions: Full system access');
      console.log('');
    } catch (error) {
      console.error('❌ Failed to seed superuser:', error.message);
    }
  }
}

// Seed admin and superuser on startup
(async () => {
  await seedAdminUser();
  await seedSuperUser();
})();

/**
 * Generate JWT token
 */
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

/**
 * Generate refresh token
 */
function generateRefreshToken(user) {
  const payload = {
    id: user.id,
    type: 'refresh',
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
}

/**
 * Verify JWT token middleware
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }
  
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Strip HTML tags from string
 */
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Send email via SendGrid
 */
async function sendEmailViaSendGrid(options) {
  const msg = {
    to: options.to,
    from: options.from || process.env.EMAIL_FROM || 'noreply@regisbridge.ac.zw',
    subject: options.subject,
    html: options.html || options.text,
    text: options.text || stripHtml(options.html || ''),
    replyTo: options.replyTo,
  };

  try {
    const result = await sgMail.send(msg);
    return {
      success: true,
      message: 'Email sent successfully',
      messageId: result[0].headers['x-message-id'],
    };
  } catch (error) {
    console.error('SendGrid error:', error.response?.body || error.message);
    throw error;
  }
}

// ============================================================================
// API ROUTES
// ============================================================================

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

/**
 * POST /api/auth/register - Register new user
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password, firstName, lastName, role, grade, studentId } = value;

    // Check if user already exists
  if (isEmailTaken(email)) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      grade: role === 'student' ? grade : undefined,
      studentId: role === 'student' ? studentId : undefined,
      createdAt: new Date().toISOString(),
    };

    // Store user
  users.set(user.id, user);

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userWithoutPassword,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
    });
  }
});

/**
 * POST /api/auth/login - Authenticate user
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

  const { email, password } = value;

  // Find user by email
  const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login',
    });
  }
});

/**
 * GET /api/auth/verify - Verify JWT token
 */
app.get('/api/auth/verify', verifyToken, (req, res) => {
  // Find user
  const user = Array.from(users.values()).find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    message: 'Token is valid',
    data: {
      user: userWithoutPassword,
    },
  });
});

/**
 * POST /api/auth/refresh - Refresh access token
 */
app.post('/api/auth/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token required',
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'fallback-secret-key');

    if (decoded.type !== 'refresh') {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    // Find user
    const user = Array.from(users.values()).find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate new access token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token',
    });
  }
});

/**
 * POST /api/auth/logout - Logout user (client-side token removal)
 */
app.post('/api/auth/logout', verifyToken, (req, res) => {
  // In a production app, you'd invalidate the token here
  // For now, client will remove the token
  res.json({
    success: true,
    message: 'Logout successful',
  });
});

// ============================================================================
// EMAIL ROUTES
// ============================================================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Regisbridge School API',
    version: '1.0.0',
  });
});

/**
 * POST /api/email/send
 * Generic email sending endpoint
 */
app.post('/api/email/send', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(d => d.message),
      });
    }

    // Send email
    const result = await sendEmailViaSendGrid(value);
    
    res.json(result);
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * POST /api/contact
 * Contact form submission
 */
app.post('/api/contact', async (req, res) => {
  try {
    // Validate
    const { error, value } = contactFormSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(d => d.message),
      });
    }

    const { name, email, phone, message } = value;

    // Send email to school
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C1A75;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #666; font-size: 12px;">
          Received: ${new Date().toLocaleString()}<br>
          IP: ${req.ip}
        </p>
      </div>
    `;

    await sendEmailViaSendGrid({
      to: process.env.EMAIL_TO || 'regisbridgepvtsch@gmail.com',
      subject: `Contact Form: ${name}`,
      html,
      replyTo: email,
    });

    // Send confirmation to user
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C1A75;">Thank You for Contacting Us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24-48 hours.</p>
        <p>Best regards,<br>Regisbridge Private School</p>
      </div>
    `;

    await sendEmailViaSendGrid({
      to: email,
      subject: 'Message Received - Regisbridge School',
      html: confirmationHtml,
    });

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

/**
 * POST /api/newsletter/subscribe
 * Newsletter subscription
 */
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    // Validate
    const { error, value } = newsletterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const { email, name } = value;

    // Send notification to school
    await sendEmailViaSendGrid({
      to: process.env.EMAIL_TO || 'regisbridgepvtsch@gmail.com',
      subject: 'New Newsletter Subscription',
      html: `
        <h3>New Newsletter Subscriber</h3>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    // Send welcome email to subscriber
    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C1A75;">Welcome to Our Newsletter!</h2>
        <p>Thank you for subscribing to Regisbridge School's newsletter.</p>
        <p>You'll receive updates about:</p>
        <ul>
          <li>School events and activities</li>
          <li>Academic achievements</li>
          <li>Important announcements</li>
          <li>Community news</li>
        </ul>
        <p>Stay connected with us!</p>
        <p>Best regards,<br>The Regisbridge Team</p>
      </div>
    `;

    await sendEmailViaSendGrid({
      to: email,
      subject: 'Welcome to Regisbridge School Newsletter',
      html: welcomeHtml,
    });

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    });
  }
});

/**
 * POST /api/application/submit
 * Student application submission
 */
app.post('/api/application/submit', async (req, res) => {
  try {
    // Validate
    const { error, value } = applicationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(d => d.message),
      });
    }

    const { studentName, parentName, email, phone, grade, message } = value;

    // Send to school
    const applicationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C1A75;">New Student Application</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Student Information</h3>
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Grade Applying For:</strong> ${grade}</p>
          
          <h3>Parent/Guardian Information</h3>
          <p><strong>Parent Name:</strong> ${parentName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          
          ${message ? `
            <h3>Additional Information</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          ` : ''}
        </div>
        <p style="color: #666; font-size: 12px;">
          Submitted: ${new Date().toLocaleString()}<br>
          IP: ${req.ip}
        </p>
      </div>
    `;

    await sendEmailViaSendGrid({
      to: process.env.EMAIL_TO || 'regisbridgepvtsch@gmail.com',
      subject: `New Application: ${studentName} - Grade ${grade}`,
      html: applicationHtml,
      replyTo: email,
    });

    // Send confirmation to parent
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1C1A75;">Application Received</h2>
        <p>Dear ${parentName},</p>
        <p>We have received your application for <strong>${studentName}</strong> to join Regisbridge School.</p>
        <p>Our admissions team will review the application and contact you within 5-7 business days.</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">What Happens Next?</h3>
          <ol>
            <li>Application review (1-2 days)</li>
            <li>Contact for interview scheduling</li>
            <li>Campus tour and student assessment</li>
            <li>Admission decision notification</li>
          </ol>
        </div>
        <p>If you have any questions, please contact us at:</p>
        <p>
          <strong>Phone:</strong> +263 779 097 410<br>
          <strong>Email:</strong> regisbridgepvtsch@gmail.com
        </p>
        <p>Thank you for your interest in Regisbridge School!</p>
        <p>Best regards,<br>Admissions Team<br>Regisbridge Private School</p>
      </div>
    `;

    await sendEmailViaSendGrid({
      to: email,
      subject: 'Application Received - Regisbridge School',
      html: confirmationHtml,
    });

    res.json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.',
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
    });
  }
});

// ============================================================================
// ADMIN ENDPOINTS
// ============================================================================

// Admin middleware - require admin or superadmin role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Admin role required.',
    });
  }
  next();
};

// Superadmin middleware - require superadmin role only
const requireSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Superadmin role required.',
    });
  }
  next();
};

// Get dashboard statistics
app.get('/api/admin/analytics/overview', verifyToken, requireAdmin, (req, res) => {
  // Mock data - replace with real database queries
  const stats = {
    totalUsers: users.size,
    totalStudents: Array.from(users.values()).filter(u => u.role === 'student').length,
    activeStudents: Array.from(users.values()).filter(u => u.role === 'student' && u.status === 'active').length,
    totalTeachers: Array.from(users.values()).filter(u => u.role === 'teacher').length,
    totalParents: Array.from(users.values()).filter(u => u.role === 'parent').length,
    revenueThisMonth: 125000,
    revenueThisYear: 1450000,
    pendingApplications: 12,
    recentEnrollments: 8,
    attendanceRate: 94.5,
    outstandingFees: 45000,
  };

  res.json({
    success: true,
    data: stats,
  });
});

// Get enrollment data
app.get('/api/admin/analytics/enrollment', verifyToken, requireAdmin, (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  
  // Mock data - replace with real database queries
  const enrollmentData = [
    { month: 'Jan', count: 45, year },
    { month: 'Feb', count: 52, year },
    { month: 'Mar', count: 48, year },
    { month: 'Apr', count: 60, year },
    { month: 'May', count: 55, year },
    { month: 'Jun', count: 42, year },
    { month: 'Jul', count: 38, year },
    { month: 'Aug', count: 65, year },
    { month: 'Sep', count: 70, year },
    { month: 'Oct', count: 62, year },
    { month: 'Nov', count: 58, year },
    { month: 'Dec', count: 50, year },
  ];

  res.json({
    success: true,
    data: enrollmentData,
  });
});

// Get revenue data
app.get('/api/admin/analytics/revenue', verifyToken, requireAdmin, (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  
  // Mock data - replace with real database queries
  const revenueData = [
    { month: 'Jan', amount: 115000, year },
    { month: 'Feb', amount: 120000, year },
    { month: 'Mar', amount: 118000, year },
    { month: 'Apr', amount: 125000, year },
    { month: 'May', amount: 130000, year },
    { month: 'Jun', amount: 110000, year },
    { month: 'Jul', amount: 105000, year },
    { month: 'Aug', amount: 135000, year },
    { month: 'Sep', amount: 140000, year },
    { month: 'Oct', amount: 132000, year },
    { month: 'Nov', amount: 128000, year },
    { month: 'Dec', amount: 122000, year },
  ];

  res.json({
    success: true,
    data: revenueData,
  });
});

// Get activity logs
app.get('/api/admin/activity-logs', verifyToken, requireAdmin, (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  
  // Mock data - replace with real database
  const logs = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Admin User',
      action: 'User created',
      resource: 'users',
      details: 'Created new student account',
      timestamp: new Date().toISOString(),
      ipAddress: req.ip,
    },
    {
      id: '2',
      userId: 'user1',
      userName: 'Admin User',
      action: 'News published',
      resource: 'content',
      details: 'Published article: School reopening announcement',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      ipAddress: req.ip,
    },
  ];

  res.json({
    success: true,
    data: logs.slice(0, limit),
  });
});

// Get all users with pagination and filters
app.get('/api/admin/users', verifyToken, requireAdmin, (req, res) => {
  const { role, status, search, page = 1, limit = 10 } = req.query;
  
  let filteredUsers = Array.from(users.values());
  
  // Apply filters
  if (role) {
    filteredUsers = filteredUsers.filter(u => u.role === role);
  }
  if (status) {
    filteredUsers = filteredUsers.filter(u => u.status === status);
  }
  if (search) {
    const searchLower = search.toLowerCase();
    filteredUsers = filteredUsers.filter(u => 
      u.firstName.toLowerCase().includes(searchLower) ||
      u.lastName.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower)
    );
  }
  
  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limitNum);
  
  res.json({
    success: true,
    data: {
      data: paginatedUsers,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
    },
  });
});

// Get user by ID
app.get('/api/admin/users/:id', verifyToken, requireAdmin, (req, res) => {
  const user = users.get(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }
  
  res.json({
    success: true,
    data: user,
  });
});

// Create new user
app.post('/api/admin/users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { email, firstName, lastName, role, grade, studentId, phoneNumber, password } = req.body;
    
    // Check if user exists
    if (Array.from(users.values()).some(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists',
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      firstName,
      lastName,
      role,
      grade: role === 'student' ? grade : undefined,
      studentId: role === 'student' ? studentId : undefined,
      phoneNumber,
      password: hashedPassword,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    
    users.set(newUser.id, newUser);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
    });
  }
});

// Update user
app.put('/api/admin/users/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const user = users.get(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    const { email, firstName, lastName, role, grade, studentId, phoneNumber, status } = req.body;
    
    // Update user
    const updatedUser = {
      ...user,
      email: email || user.email,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      role: role || user.role,
      grade: grade !== undefined ? grade : user.grade,
      studentId: studentId !== undefined ? studentId : user.studentId,
      phoneNumber: phoneNumber !== undefined ? phoneNumber : user.phoneNumber,
      status: status || user.status,
      updatedAt: new Date().toISOString(),
    };
    
    users.set(req.params.id, updatedUser);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
    });
  }
});

// Delete user
app.delete('/api/admin/users/:id', verifyToken, requireAdmin, (req, res) => {
  const user = users.get(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }
  
  // Don't allow deleting yourself
  if (req.params.id === req.user.id) {
    return res.status(400).json({
      success: false,
      error: 'Cannot delete your own account',
    });
  }
  
  users.delete(req.params.id);
  
  res.json({
    success: true,
    message: 'User deleted successfully',
  });
});

// Export users to CSV
app.get('/api/admin/export/users', verifyToken, requireAdmin, (req, res) => {
  const allUsers = Array.from(users.values());
  
  // Create CSV
  const headers = ['ID', 'Email', 'First Name', 'Last Name', 'Role', 'Grade', 'Student ID', 'Status', 'Created At'];
  const rows = allUsers.map(u => [
    u.id,
    u.email,
    u.firstName,
    u.lastName,
    u.role,
    u.grade || '',
    u.studentId || '',
    u.status,
    u.createdAt,
  ]);
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
  res.send(csv);
});

// Placeholder endpoints for other admin features
app.get('/api/admin/students', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: { data: [], total: 0, page: 1, limit: 10, totalPages: 0 } });
});

app.get('/api/admin/news', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/admin/events', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/admin/classes', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/admin/payments', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: { data: [], total: 0, page: 1, limit: 10, totalPages: 0 } });
});

app.get('/api/admin/fee-structures', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/admin/analytics/attendance', verifyToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/admin/export/students', verifyToken, requireAdmin, (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
  res.send('ID,Name,Email,Grade\n');
});

app.get('/api/admin/export/payments', verifyToken, requireAdmin, (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=payments.csv');
  res.send('ID,Student,Amount,Status\n');
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Regisbridge School API Server');
  console.log('================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ CORS origins: ${allowedOrigins.join(', ')}`);
  console.log('');
  console.log('Available endpoints:');
  console.log('');
  console.log('  Authentication:');
  console.log(`    POST http://localhost:${PORT}/api/auth/register`);
  console.log(`    POST http://localhost:${PORT}/api/auth/login`);
  console.log(`    GET  http://localhost:${PORT}/api/auth/verify`);
  console.log(`    POST http://localhost:${PORT}/api/auth/refresh`);
  console.log(`    POST http://localhost:${PORT}/api/auth/logout`);
  console.log('');
  console.log('  Email & Forms:');
  console.log(`    GET  http://localhost:${PORT}/api/health`);
  console.log(`    POST http://localhost:${PORT}/api/email/send`);
  console.log(`    POST http://localhost:${PORT}/api/contact`);
  console.log(`    POST http://localhost:${PORT}/api/newsletter/subscribe`);
  console.log(`    POST http://localhost:${PORT}/api/application/submit`);
  console.log('');
  console.log('  Admin (requires admin role):');
  console.log(`    GET  http://localhost:${PORT}/api/admin/analytics/overview`);
  console.log(`    GET  http://localhost:${PORT}/api/admin/analytics/enrollment`);
  console.log(`    GET  http://localhost:${PORT}/api/admin/analytics/revenue`);
  console.log(`    GET  http://localhost:${PORT}/api/admin/activity-logs`);
  console.log(`    GET  http://localhost:${PORT}/api/admin/users`);
  console.log(`    POST http://localhost:${PORT}/api/admin/users`);
  console.log(`    PUT  http://localhost:${PORT}/api/admin/users/:id`);
  console.log(`    DELETE http://localhost:${PORT}/api/admin/users/:id`);
  console.log(`    GET  http://localhost:${PORT}/api/admin/export/users`);
  console.log('');
});
