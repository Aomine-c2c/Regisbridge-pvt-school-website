# 🚀 Quick Start Guide - Regisbridge School Website

## ✅ Project Status

- ✅ **Phase 1:** Security fixes complete
- ✅ **Phase 2:** Backend API complete
- ✅ **Phase 3:** Authentication system complete
- 🔜 **Phase 4:** Testing infrastructure
- 🔜 **Phase 5:** Database integration

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- SendGrid account (free tier available - optional for email features)

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Get SendGrid API Key (FREE - Takes 5 minutes)

1. Go to https://sendgrid.com/free
2. Sign up for a **FREE** account (100 emails/day)
3. Verify your email address
4. Go to **Settings** → **API Keys**
5. Click **Create API Key**
6. Give it a name: "Regisbridge Website"
7. Select **Full Access**
8. Click **Create & View**
9. **COPY THE KEY** (you'll only see it once!)

### Step 3: Configure Environment Variables

#### Backend Configuration
Edit `server/.env`:
```bash
# Paste your SendGrid API key here (starts with SG.)
SENDGRID_API_KEY=SG.paste-your-key-here

# These are already set correctly
EMAIL_FROM=noreply@regisbridge.ac.zw
EMAIL_TO=regisbridgepvtsch@gmail.com
PORT=3002
```

#### Frontend Configuration
The `.env` file is already created with correct settings:
```bash
VITE_API_URL=http://localhost:3002/api
```

### Step 4: Verify Sender Email in SendGrid

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in the form:
   - **From Name:** Regisbridge School
   - **From Email:** regisbridgepvtsch@gmail.com (or your school email)
   - **Reply To:** Same as above
   - **Company:** Regisbridge Private School
   - **Address:** 3502 Turf, Ngezi, Mhondoro
   - **City:** Ngezi
   - **Country:** Zimbabwe
4. Click **Create**
5. Check your email and click the verification link
6. Update `server/.env` with the verified email:
   ```bash
   EMAIL_FROM=regisbridgepvtsch@gmail.com
   ```

---

## 🚀 Running the Application

### Option 1: Quick Start (Recommended)

```bash
# Start both frontend and backend simultaneously
npm run dev         # Frontend (Terminal 1)
cd server && npm run dev   # Backend (Terminal 2 - open new terminal)
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on: http://localhost:3002

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Website runs on: http://localhost:8080

---

## 🧪 Testing the Backend

### Method 1: Browser Test Page
1. Open `server/test.html` in your browser
2. Click each test button:
   - ✅ Health Check
   - ✅ Contact Form
   - ✅ Newsletter
   - ✅ Application
   - ✅ Generic Email

### Method 2: Using the Website
1. Open http://localhost:8080
2. Scroll to Contact section
3. Fill out the form
4. Submit
5. Check your email for confirmation!

### Method 3: cURL (Advanced)
```bash
# Health check
curl http://localhost:3002/api/health

# Test contact form
curl -X POST http://localhost:3002/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing the API!"
  }'
```

---

## 📊 What's Working

✅ **Backend API Server**
- Express.js REST API
- 10 endpoints total:
  - 5 authentication endpoints (register, login, verify, refresh, logout)
  - 5 email/form endpoints (health, email, contact, newsletter, application)
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation with Joi
- Rate limiting & CORS security
- Error handling

✅ **Frontend Features**
- Modern React + TypeScript
- Secure authentication system
- Login & Registration forms
- Protected routes
- Session persistence
- Auto token refresh
- Beautiful UI with Tailwind CSS
- Responsive design

✅ **Authentication System (NEW!)**
- User registration with validation
- Secure login with JWT tokens
- Password strength requirements
- Role-based access control (student/parent/teacher)
- Session management
- Auto logout on token expiry

✅ **Security**
- Hashed passwords (bcrypt)
- JWT tokens (7-day expiry)
- Protected API endpoints
- CORS protection
- Rate limiting (10 req/15min)
- Input validation
- Security headers

✅ **Documentation**
- Complete API docs (server/README.md)
- Phase summaries (PHASE_1, PHASE_2, PHASE_3)
- Implementation guides
- Testing guides

---

## 🎯 Next Steps

### Immediate
- [x] Backend API created ✅
- [x] Frontend integration ✅
- [ ] **Get SendGrid API key** (do this now!)
- [ ] Test all endpoints
- [ ] Update contact forms to use new API

### Phase 3: Authentication (COMPLETED! ✅)
- [x] Backend auth endpoints ✅
- [x] JWT token system ✅
- [x] Password hashing ✅
- [x] Frontend auth service ✅
- [x] Login & register forms ✅
- [x] Protected routes ✅
- See: `PHASE_3_SUMMARY.md` & `AUTH_TESTING.md`

### Phase 4: Testing Infrastructure (NEXT)
- [ ] Setup Vitest
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Setup CI/CD
- See: `IMPLEMENTATION_GUIDE.md` Phase 4

---

## ⚠️ Important Notes

### SendGrid Free Tier Limits
- **100 emails per day** (FREE forever)
- If you need more, upgrade to paid plan ($19.95/month for 50k emails)

### Port Already in Use?
If you see "EADDRINUSE" error:
```bash
# Find what's using port 3002
netstat -ano | findstr :3002

# Kill the process (replace PID with actual number)
taskkill /PID <number> /F

# Or change port in server/.env
PORT=3003
```

### CORS Errors?
Make sure:
1. Backend is running on port 3002
2. Frontend .env has: `VITE_API_URL=http://localhost:3002/api`
3. Restart frontend after changing .env

### Emails Not Sending?
Check:
1. SendGrid API key is valid (starts with SG.)
2. Sender email is verified in SendGrid
3. Check SendGrid dashboard for errors
4. Look in spam folder
5. Backend console for error messages

---

## 📁 Project Structure

```
v54/
├── src/                    # Frontend React app
│   ├── services/
│   │   └── emailService.ts # API client (updated)
│   └── ...
├── server/                 # Backend API (NEW!)
│   ├── index.js           # Main API server
│   ├── package.json       # Backend dependencies
│   ├── .env              # Config (add SendGrid key here)
│   ├── .env.example      # Template
│   ├── test.html         # Test page
│   └── README.md         # API documentation
├── .env                  # Frontend config
├── .env.example          # Template
├── IMPLEMENTATION_GUIDE.md  # Full 7-phase guide
├── PHASE_1_SUMMARY.md    # Phase 1 completed
├── PHASE_2_SUMMARY.md    # Phase 2 completed
└── QUICK_REFERENCE.md    # Quick commands
```

---

## 🆘 Troubleshooting

### "Module not found" errors
```bash
# Reinstall dependencies
npm install
cd server && npm install
```

### "Cannot find module 'dotenv'"
```bash
cd server
npm install dotenv express cors @sendgrid/mail helmet joi express-rate-limit
```

### Backend not starting
```bash
# Check logs
cd server
node index.js

# Or with more details
NODE_ENV=development node index.js
```

### Frontend can't connect to backend
1. Check backend is running: http://localhost:3002/api/health
2. Check frontend .env has correct URL
3. Restart frontend after .env changes

---

## 📞 Support

**Email:** regisbridgepvtsch@gmail.com  
**Phone:** +263 779 097 410

**Documentation:**
- API Docs: `server/README.md`
- Full Guide: `IMPLEMENTATION_GUIDE.md`
- Quick Ref: `QUICK_REFERENCE.md`

---

## ✨ You're Almost There!

**Current Status:**
- ✅ Phase 1: Security fixes complete
- ✅ Phase 2: Backend API complete
- 🟡 SendGrid API key needed
- 🔜 Phase 3: Authentication

**Just add your SendGrid API key and you're ready to test! 🚀**

---

*Last updated: October 19, 2025*
*Version: 2.0.0 (Backend Added!)*
