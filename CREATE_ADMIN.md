# How to Create an Admin User

Since the registration form is for students only, you can create an admin user using one of these methods:

## Method 1: Using API directly (Recommended)

Use a tool like Postman or curl to call the registration API:

```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:3000/api/auth/register" -Method POST -ContentType "application/json" -Body '{
  "email": "admin@regisbridge.ac.zw",
  "password": "Admin@123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin"
}'
```

Or using curl:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@regisbridge.ac.zw",
    "password": "Admin@123",
    "firstName": "Admin",
    "lastName": "User",
    "role": "admin"
  }'
```

## Method 2: Create an admin registration page

I can create a temporary admin registration page at `/admin/register` if needed.

## Method 3: Access the admin dashboard

Once you have an admin account:

1. Go to: `http://localhost:3000/login`
2. Login with your admin credentials
3. You'll be redirected to: `http://localhost:3000/admin`

## Default Test Admin (If you want me to create one)

Let me know if you want me to create a dedicated admin registration endpoint or page!

**Credentials structure:**
- **Email**: admin@regisbridge.ac.zw
- **Password**: Must be 8+ characters with uppercase, lowercase, and number
- **Role**: admin
