# Authentication Test Guide

## Quick Test - Backend Authentication

### 1. Start the Backend Server

```powershell
cd server
npm start
```

You should see:
```
🚀 Regisbridge School API Server
================================
✅ Server running on port 3002
✅ Environment: development
✅ CORS origins: http://localhost:8080, http://localhost:5173

Available endpoints:

  Authentication:
    POST http://localhost:3002/api/auth/register
    POST http://localhost:3002/api/auth/login
    GET  http://localhost:3002/api/auth/verify
    POST http://localhost:3002/api/auth/refresh
    POST http://localhost:3002/api/auth/logout

  Email & Forms:
    GET  http://localhost:3002/api/health
    POST http://localhost:3002/api/email/send
    POST http://localhost:3002/api/contact
    POST http://localhost:3002/api/newsletter/subscribe
    POST http://localhost:3002/api/application/submit
```

### 2. Test with PowerShell

```powershell
# Test 1: Register a new user
Invoke-RestMethod -Uri "http://localhost:3002/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"john@test.com","password":"Password123","firstName":"John","lastName":"Doe","role":"student","grade":"Form 3A","studentId":"STU001"}'

# Test 2: Login
$response = Invoke-RestMethod -Uri "http://localhost:3002/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"john@test.com","password":"Password123"}'

# Save token for next test
$token = $response.data.token

# Test 3: Verify token
Invoke-RestMethod -Uri "http://localhost:3002/api/auth/verify" `
  -Method GET `
  -Headers @{ "Authorization" = "Bearer $token" }

# Test 4: Logout
Invoke-RestMethod -Uri "http://localhost:3002/api/auth/logout" `
  -Method POST `
  -Headers @{ "Authorization" = "Bearer $token" }
```

### 3. Test with Browser

Open `server/test.html` in your browser (update it to include auth tests).

### 4. Test Frontend Integration

```powershell
# In a new terminal, start the frontend
npm run dev
```

Navigate to:
- http://localhost:8080/register - Test registration
- http://localhost:8080/login - Test login
- http://localhost:8080/portal - Test protected route

### Expected Results:

✅ **Register:**
- Fill form with valid data
- Click "Create Account"
- Should see loading spinner
- Should redirect to portal
- Token should be in localStorage

✅ **Login:**
- Enter registered credentials
- Click "Sign In"
- Should see loading spinner
- Should redirect to portal
- Session persists on refresh

✅ **Protected Route:**
- Without login → Redirected to /login
- After login → Can access /portal
- After logout → Redirected again

### Troubleshooting:

**Server won't start:**
```powershell
# Check if port 3002 is in use
netstat -ano | findstr :3002

# Kill the process if needed
taskkill /PID <process_id> /F
```

**CORS errors:**
- Make sure frontend URL is in ALLOWED_ORIGINS
- Check browser console for specific error
- Restart both servers after .env changes

**Token errors:**
- Check JWT_SECRET is set in server/.env
- Verify token not expired
- Check Authorization header format: "Bearer <token>"

## Manual Testing Checklist

### Backend API Tests:

- [ ] POST /api/auth/register - Creates new user
- [ ] POST /api/auth/register - Rejects duplicate email
- [ ] POST /api/auth/register - Validates password strength
- [ ] POST /api/auth/login - Accepts valid credentials
- [ ] POST /api/auth/login - Rejects invalid password
- [ ] POST /api/auth/login - Rejects non-existent user
- [ ] GET /api/auth/verify - Validates good token
- [ ] GET /api/auth/verify - Rejects bad token
- [ ] POST /api/auth/refresh - Refreshes token
- [ ] POST /api/auth/logout - Logs out user

### Frontend UI Tests:

- [ ] Register form shows password requirements
- [ ] Register form validates email format
- [ ] Register form checks password match
- [ ] Register form requires grade for students
- [ ] Login form validates input
- [ ] Login form shows/hides password
- [ ] Login form displays errors
- [ ] Protected route redirects when not logged in
- [ ] Protected route allows access when logged in
- [ ] Logout clears session
- [ ] Session persists on page refresh

### Security Tests:

- [ ] Password not visible in network tab
- [ ] Token properly formatted (JWT)
- [ ] Token contains correct user data
- [ ] Cannot access protected API without token
- [ ] Cannot use expired token
- [ ] Cannot tamper with token
- [ ] Passwords hashed in backend (not plain text)

---

All tests passing? ✅ **Phase 3 Complete!**
