# Regisbridge School Backend API

Backend API server for handling email sending, contact forms, newsletter subscriptions, and student applications.

## Features

- ✅ Email sending via SendGrid
- ✅ Contact form submissions
- ✅ Newsletter subscriptions
- ✅ Student application handling
- ✅ Rate limiting (10 requests per 15 minutes)
- ✅ Input validation with Joi
- ✅ CORS protection
- ✅ Security headers with Helmet
- ✅ Request logging

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values
# At minimum, set:
# - SENDGRID_API_KEY (get from https://sendgrid.com)
# - EMAIL_TO (your school email)
```

### 3. Start Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-19T12:00:00.000Z",
  "service": "Regisbridge School API",
  "version": "1.0.0"
}
```

### Send Email
```http
POST /api/email/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "html": "<p>Hello World!</p>",
  "replyTo": "sender@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "abc123"
}
```

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+263771234567",
  "message": "I would like to inquire about enrollment..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!"
}
```

### Newsletter Subscription
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "subscriber@example.com",
  "name": "Jane Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!"
}
```

### Student Application
```http
POST /api/application/submit
Content-Type: application/json

{
  "studentName": "Sarah Smith",
  "parentName": "John Smith",
  "email": "john.smith@example.com",
  "phone": "+263771234567",
  "grade": "Grade 5",
  "message": "Optional additional information..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully! Check your email for confirmation."
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:8080` |
| `SENDGRID_API_KEY` | SendGrid API key | **(required)** |
| `EMAIL_FROM` | Sender email address | `noreply@regisbridge.ac.zw` |
| `EMAIL_TO` | School email (receives forms) | `regisbridgepvtsch@gmail.com` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `10` |

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"email\" must be a valid email"
  ]
}
```

### Rate Limit (429)
```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to send email"
}
```

## Security Features

- **Helmet**: Sets security HTTP headers
- **CORS**: Restricts access to allowed origins only
- **Rate Limiting**: Prevents abuse (10 requests per 15 minutes per IP)
- **Input Validation**: Joi schema validation on all endpoints
- **Request Logging**: All requests logged with timestamp

## Testing

### Using curl

```bash
# Health check
curl http://localhost:3001/api/health

# Test contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Using Postman

1. Import the collection (create one from endpoints above)
2. Set environment variable `BASE_URL=http://localhost:3001`
3. Test each endpoint

## Deployment

### Option 1: Netlify Functions

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Create `netlify/functions/api.js`:
```javascript
import serverless from 'serverless-http';
import app from '../../server/index.js';

export const handler = serverless(app);
```
3. Deploy: `netlify deploy --prod`

### Option 2: Vercel Serverless

1. Install Vercel CLI: `npm install -g vercel`
2. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    { "src": "server/index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/index.js" }
  ]
}
```
3. Deploy: `vercel --prod`

### Option 3: Traditional Hosting (DigitalOcean, AWS EC2, etc.)

1. SSH into server
2. Clone repository
3. Install Node.js 18+
4. Install dependencies: `npm install`
5. Set environment variables
6. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server/index.js --name regisbridge-api
pm2 save
pm2 startup
```

## Troubleshooting

### "SendGrid API key not configured"
**Fix:** Set `SENDGRID_API_KEY` in your `.env` file

### "Not allowed by CORS"
**Fix:** Add your frontend URL to `ALLOWED_ORIGINS` in `.env`:
```
ALLOWED_ORIGINS=http://localhost:8080,https://yourdomain.com
```

### "Too many requests"
**Fix:** Wait 15 minutes or adjust `RATE_LIMIT_MAX_REQUESTS` in `.env`

### Emails not being received
**Fix:** 
1. Check SendGrid dashboard for delivery status
2. Verify `EMAIL_TO` is correct
3. Check spam folder
4. Verify SendGrid domain authentication

## Monitoring

### Production Monitoring

- Use SendGrid dashboard to track email delivery
- Monitor server logs for errors
- Set up alerts for failed requests
- Use Sentry or similar for error tracking

### Logs

Logs include:
- Timestamp
- HTTP method and path
- Error details (in development mode)
- SendGrid responses

## License

MIT

## Support

For issues or questions:
- **Email:** regisbridgepvtsch@gmail.com
- **Phone:** +263 779 097 410
