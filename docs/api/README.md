# API Documentation

This directory contains comprehensive API documentation for the Regisbridge School Management System.

## 📡 API Overview

| API Type | Base URL | Purpose | Status |
|----------|----------|---------|--------|
| **Authentication API** | `/api/auth/*` | User authentication, registration, login | ✅ Complete |
| **Admin API** | `/api/admin/*` | Administrative operations, user management | ✅ Complete |
| **Email API** | `/api/email/*` | Email sending, contact forms | ✅ Complete |
| **General API** | `/api/*` | Health checks, general endpoints | ✅ Complete |

## 🔗 Quick API Reference

### Authentication Endpoints
```bash
# Register new user
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "role": "student",
  "grade": "10",
  "studentId": "STU2025001"
}

# Login user
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

# Verify token
GET /api/auth/verify
Authorization: Bearer YOUR_JWT_TOKEN

# Refresh token
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}

# Logout
POST /api/auth/logout
Authorization: Bearer YOUR_JWT_TOKEN
```

### Admin Endpoints
```bash
# Get dashboard overview
GET /api/admin/analytics/overview
Authorization: Bearer ADMIN_JWT_TOKEN

# List users
GET /api/admin/users?page=1&limit=10&role=student
Authorization: Bearer ADMIN_JWT_TOKEN

# Create user
POST /api/admin/users
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

{
  "email": "new@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "student",
  "password": "TempPass123!"
}

# Export users to CSV
GET /api/admin/export/users
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Email Endpoints
```bash
# Send generic email
POST /api/email/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Hello",
  "html": "<p>Message content</p>"
}

# Submit contact form
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Contact message"
}
```

## 📖 Detailed Documentation

### Authentication API
**File:** `auth-api.md`
- Complete endpoint documentation
- Request/response examples
- Error handling
- Security considerations
- Testing procedures

### Admin API
**File:** `admin-api.md`
- User management endpoints
- Analytics endpoints
- CRUD operations
- Export functionality
- Role-based access control

### Email API
**File:** `email-api.md`
- SendGrid integration
- Contact form handling
- Newsletter subscriptions
- Application submissions
- Rate limiting

### General API
**File:** `general-api.md`
- Health checks
- Server status
- Configuration endpoints
- Utility functions

## 🔐 Authentication & Security

### JWT Token Usage
All protected endpoints require JWT authentication:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
- **Access Token:** 7 days
- **Refresh Token:** 30 days
- Automatic refresh mechanism available

### Rate Limiting
- **General endpoints:** 100 requests per 15 minutes
- **Authentication:** 10 requests per 15 minutes
- **Admin endpoints:** 50 requests per 15 minutes

### CORS Configuration
- **Development:** `http://localhost:8080`, `http://localhost:5173`
- **Production:** Configured per environment

## 🧪 API Testing

### Using cURL
```bash
# Health check
curl http://localhost:3002/api/health

# Login and get token
TOKEN=$(curl -s -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@test.com","password":"Password123"}' \
  | jq -r '.token')

# Use token in requests
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3002/api/admin/users
```

### Using Browser
1. Open `server/test.html` in browser
2. Test all endpoints interactively
3. View request/response details
4. Check authentication flows

### Using Postman/Insomnia
1. Import API collection (future)
2. Set base URL: `http://localhost:3002/api`
3. Configure authentication headers
4. Test endpoints systematically

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "total": 856,
  "page": 1,
  "limit": 10,
  "totalPages": 86
}
```

## 🚨 Error Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Server
PORT=3002
NODE_ENV=development

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Email (SendGrid)
SENDGRID_API_KEY=SG.your-sendgrid-key
EMAIL_FROM=noreply@regisbridge.ac.zw
EMAIL_TO=school@regisbridge.ac.zw

# Security
CORS_ORIGINS=http://localhost:8080,http://localhost:5173
```

### Development vs Production
- **Development:** Localhost origins, detailed logging
- **Production:** Secure origins, minimal logging, stronger secrets

## 📈 API Performance

### Current Performance
- **Health Check:** <100ms
- **Authentication:** <200ms
- **User Management:** <300ms
- **Email Sending:** <500ms (SendGrid dependent)

### Optimization Features
- Input validation caching
- Response compression
- Connection pooling (future)
- Database query optimization (future)

## 🔄 API Versioning

### Current Version: v1
- Base path: `/api/v1/` (future implementation)
- Current endpoints use `/api/` (v1 implied)

### Versioning Strategy
- URL path versioning: `/api/v1/resource`
- Header versioning: `Accept: application/vnd.api.v1+json`
- Backward compatibility maintained

## 📚 API Documentation Files

### Complete References
- **`auth-api.md`** - Authentication endpoints
- **`admin-api.md`** - Admin management endpoints
- **`email-api.md`** - Email and contact endpoints
- **`general-api.md`** - Health and utility endpoints

### Implementation Details
- **`server/README.md`** - Backend server documentation
- **`ADMIN_API_DOCUMENTATION.md`** - Detailed admin API reference
- **`AUTHENTICATION_TEST_RESULTS.md`** - API testing results

## 🎯 API Development Status

### ✅ Completed
- Authentication system (JWT + bcrypt)
- Admin dashboard APIs
- Email integration (SendGrid)
- Input validation (Joi)
- Security middleware
- Comprehensive documentation

### 🔄 Ready for Implementation
- Database integration (Phase 5)
- Advanced analytics
- File upload endpoints
- Real-time notifications
- API versioning

### 📋 Planned Features
- GraphQL API (future)
- WebSocket support
- API rate limiting per user
- Request/response logging
- API analytics dashboard

## 🆘 Troubleshooting

### Common API Issues
- **401 Unauthorized:** Check token validity and expiration
- **403 Forbidden:** Verify user roles and permissions
- **429 Rate Limited:** Wait for rate limit reset
- **500 Server Error:** Check server logs for details

### Debugging Tools
- Browser Network tab
- Server console logs
- JWT token decoder (jwt.io)
- API testing tools (Postman, Insomnia)

### Support Resources
- API documentation in this directory
- Server logs for error details
- Testing guides for verification steps
- GitHub issues for bug reports

---

*API Documentation Index - Updated: November 4, 2025*  
*Status: Complete API reference available*  
*Coverage: 100% of implemented endpoints documented*