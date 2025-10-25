# Admin API Documentation

## Overview
Complete REST API documentation for all admin endpoints. All endpoints require admin role authentication.

## Base URL
```
http://localhost:3002/api/admin
```

## Authentication
All admin endpoints require:
1. Valid JWT token in Authorization header
2. User role must be 'admin'

### Headers
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

### Error Responses
```json
// 401 Unauthorized - Invalid/missing token
{
  "success": false,
  "message": "No token provided"
}

// 403 Forbidden - Not admin role
{
  "success": false,
  "message": "Admin access required"
}
```

---

## Analytics Endpoints

### Get Dashboard Overview
Get high-level statistics for admin dashboard.

**Endpoint:** `GET /api/admin/analytics/overview`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "activeStudents": 856,
    "totalRevenue": 245000,
    "pendingApplications": 23,
    "totalTeachers": 65,
    "totalParents": 890,
    "attendanceRate": 94.5,
    "newEnrollmentsThisMonth": 12
  }
}
```

**Current Status:** Returns mock data. Replace with database queries in production.

---

### Get Enrollment Data
Get monthly enrollment statistics.

**Endpoint:** `GET /api/admin/analytics/enrollment`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| year | number | No | Current year | Year to get data for |

**Example:**
```
GET /api/admin/analytics/enrollment?year=2025
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "count": 42 },
    { "month": "Feb", "count": 38 },
    { "month": "Mar", "count": 45 },
    { "month": "Apr", "count": 52 },
    { "month": "May", "count": 48 },
    { "month": "Jun", "count": 55 }
  ]
}
```

**Current Status:** Returns mock data. Replace with database queries in production.

---

### Get Revenue Data
Get monthly revenue statistics.

**Endpoint:** `GET /api/admin/analytics/revenue`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| year | number | No | Current year | Year to get data for |

**Example:**
```
GET /api/admin/analytics/revenue?year=2025
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "month": "Jan", "amount": 125000 },
    { "month": "Feb", "amount": 132000 },
    { "month": "Mar", "amount": 145000 },
    { "month": "Apr", "amount": 138000 },
    { "month": "May", "amount": 142000 },
    { "month": "Jun", "amount": 150000 }
  ]
}
```

**Current Status:** Returns mock data. Replace with database queries in production.

---

### Get Activity Logs
Get recent activity log entries.

**Endpoint:** `GET /api/admin/activity-logs`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | number | No | 50 | Maximum number of logs to return |

**Example:**
```
GET /api/admin/activity-logs?limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "log_001",
      "action": "User Registration",
      "user": "john.doe@regisbridge.edu",
      "timestamp": "2025-06-20T10:30:00Z",
      "details": "New student registered"
    },
    {
      "id": "log_002",
      "action": "Payment Received",
      "user": "jane.smith@regisbridge.edu",
      "timestamp": "2025-06-20T09:15:00Z",
      "details": "Tuition payment processed"
    }
  ]
}
```

**Current Status:** Returns 2 mock log entries. Replace with database queries in production.

---

## User Management Endpoints

### List Users
Get paginated list of users with optional filtering and search.

**Endpoint:** `GET /api/admin/users`

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| page | number | No | 1 | Page number |
| limit | number | No | 10 | Items per page |
| role | string | No | - | Filter by role (student, teacher, parent, admin) |
| status | string | No | - | Filter by status (active, inactive, suspended) |
| search | string | No | - | Search in firstName, lastName, email |

**Example:**
```
GET /api/admin/users?page=1&limit=10&role=student&status=active&search=john
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user_123",
      "email": "john.doe@regisbridge.edu",
      "firstName": "John",
      "lastName": "Doe",
      "role": "student",
      "grade": "10",
      "studentId": "STU2025001",
      "phoneNumber": "+1234567890",
      "status": "active",
      "createdAt": "2025-01-15T08:00:00Z"
    }
  ],
  "total": 856,
  "page": 1,
  "limit": 10,
  "totalPages": 86
}
```

**Filter Behavior:**
- Multiple filters combine with AND logic
- Search is case-insensitive and matches partial strings
- Empty filters are ignored

---

### Get User by ID
Get detailed information for a specific user.

**Endpoint:** `GET /api/admin/users/:id`

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ID |

**Example:**
```
GET /api/admin/users/user_123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "john.doe@regisbridge.edu",
    "firstName": "John",
    "lastName": "Doe",
    "role": "student",
    "grade": "10",
    "studentId": "STU2025001",
    "phoneNumber": "+1234567890",
    "status": "active",
    "createdAt": "2025-01-15T08:00:00Z"
  }
}
```

**Error Response:**
```json
// 404 Not Found
{
  "success": false,
  "message": "User not found"
}
```

---

### Create User
Create a new user account.

**Endpoint:** `POST /api/admin/users`

**Request Body:**
```json
{
  "email": "jane.smith@regisbridge.edu",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "student",
  "password": "SecurePass123!",
  "grade": "9",
  "studentId": "STU2025002",
  "phoneNumber": "+1234567891"
}
```

**Required Fields:**
- `email` (string, valid email format)
- `firstName` (string)
- `lastName` (string)
- `role` (string: student, teacher, parent, admin)
- `password` (string, min 6 characters)

**Optional Fields:**
- `grade` (string, required if role=student)
- `studentId` (string, required if role=student)
- `phoneNumber` (string)
- `status` (string, defaults to 'active')

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_124",
    "email": "jane.smith@regisbridge.edu",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "student",
    "grade": "9",
    "studentId": "STU2025002",
    "phoneNumber": "+1234567891",
    "status": "active",
    "createdAt": "2025-06-20T12:00:00Z"
  }
}
```

**Error Responses:**
```json
// 400 Bad Request - Email already exists
{
  "success": false,
  "message": "Email already registered"
}

// 400 Bad Request - Missing required fields
{
  "success": false,
  "message": "Missing required field: email"
}
```

**Security:**
- Password is hashed using bcrypt (10 rounds) before storage
- Password is never returned in response
- Email uniqueness is enforced

---

### Update User
Update an existing user's information.

**Endpoint:** `PUT /api/admin/users/:id`

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ID to update |

**Request Body (all fields optional):**
```json
{
  "firstName": "Jane",
  "lastName": "Smith-Johnson",
  "phoneNumber": "+1234567892",
  "status": "active",
  "grade": "10"
}
```

**Updatable Fields:**
- `firstName`
- `lastName`
- `phoneNumber`
- `status`
- `grade`
- `studentId`
- `role`

**Note:** Password cannot be updated via this endpoint. Use dedicated password reset endpoint (future implementation).

**Example:**
```
PUT /api/admin/users/user_124
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "user_124",
    "email": "jane.smith@regisbridge.edu",
    "firstName": "Jane",
    "lastName": "Smith-Johnson",
    "role": "student",
    "grade": "10",
    "studentId": "STU2025002",
    "phoneNumber": "+1234567892",
    "status": "active",
    "createdAt": "2025-06-20T12:00:00Z"
  }
}
```

**Error Response:**
```json
// 404 Not Found
{
  "success": false,
  "message": "User not found"
}
```

**Behavior:**
- Only provided fields are updated (partial update)
- Missing fields are left unchanged
- Returns full user object after update

---

### Delete User
Delete a user account.

**Endpoint:** `DELETE /api/admin/users/:id`

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | User ID to delete |

**Example:**
```
DELETE /api/admin/users/user_124
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "success": false,
  "message": "User not found"
}

// 403 Forbidden - Cannot delete own account
{
  "success": false,
  "message": "Cannot delete your own account"
}
```

**Security:**
- Admin cannot delete their own account (prevents lockout)
- Deletion is permanent (consider soft delete in production)
- All related data should be handled (future: cascade delete)

---

### Export Users to CSV
Export all users to CSV file.

**Endpoint:** `GET /api/admin/export/users`

**Response:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="users_export_[timestamp].csv"

ID,Email,First Name,Last Name,Role,Grade,Student ID,Status,Created At
user_123,john.doe@regisbridge.edu,John,Doe,student,10,STU2025001,active,2025-01-15T08:00:00Z
user_124,jane.smith@regisbridge.edu,Jane,Smith,student,9,STU2025002,active,2025-06-20T12:00:00Z
```

**CSV Columns:**
1. ID
2. Email
3. First Name
4. Last Name
5. Role
6. Grade
7. Student ID
8. Status
9. Created At

**Behavior:**
- Downloads as file (browser triggers download)
- Includes all users (no pagination)
- Password is never included
- Empty fields shown as empty strings

---

## Placeholder Endpoints

The following endpoints return empty data and are ready for implementation:

### Students
- `GET /api/admin/students` - Returns empty paginated response
- `GET /api/admin/export/students` - Returns CSV headers only

### Content
- `GET /api/admin/news` - Returns empty array
- `GET /api/admin/events` - Returns empty array

### Academic
- `GET /api/admin/classes` - Returns empty array

### Finance
- `GET /api/admin/payments` - Returns empty paginated response
- `GET /api/admin/fee-structures` - Returns empty array
- `GET /api/admin/export/payments` - Returns CSV headers only

### Analytics
- `GET /api/admin/analytics/attendance` - Returns empty array

---

## Common Response Patterns

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
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

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation error, missing fields |
| 401 | Unauthorized | Invalid/missing token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected server error |

---

## Rate Limiting

All endpoints are subject to rate limiting:
- **Window:** 15 minutes
- **Max Requests:** 100 per window
- **Response on limit:**
  ```json
  {
    "success": false,
    "message": "Too many requests, please try again later."
  }
  ```

**Note:** Admin endpoints may need higher limits in production.

---

## Testing with cURL

### Get JWT Token
```bash
# Login to get token
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@regisbridge.edu","password":"Admin123!"}'

# Response includes token
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Use Token in Requests
```bash
# Replace YOUR_TOKEN with actual token from login
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# List users
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3002/api/admin/users

# Create user
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","firstName":"Test","lastName":"User","role":"student","password":"Test123"}' \
  http://localhost:3002/api/admin/users

# Update user
curl -X PUT -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Updated"}' \
  http://localhost:3002/api/admin/users/user_123

# Delete user
curl -X DELETE -H "Authorization: Bearer $TOKEN" \
  http://localhost:3002/api/admin/users/user_123
```

---

## Production Considerations

### Database Migration
Current implementation uses in-memory Map(). For production:

1. **Replace with PostgreSQL/MongoDB:**
   ```javascript
   // Current
   const users = new Map();
   
   // Production
   const users = await prisma.user.findMany();
   ```

2. **Add indexes:**
   - Email (unique)
   - Role + Status (composite)
   - Created date

3. **Implement transactions:**
   - User creation with related records
   - Cascading deletes

### Security Enhancements
1. **Input validation:** Add Joi schemas for all endpoints
2. **SQL injection:** Use parameterized queries
3. **XSS protection:** Sanitize all user input
4. **CSRF tokens:** Add for state-changing operations
5. **Audit logging:** Log all admin actions to database
6. **Password policies:** Enforce complexity requirements

### Performance Optimization
1. **Caching:** Cache dashboard stats (Redis)
2. **Pagination:** Implement cursor-based for large datasets
3. **Indexes:** Add database indexes for filters
4. **Query optimization:** Use select specific fields
5. **Compression:** Enable gzip for large responses

### Monitoring
1. **Error tracking:** Integrate Sentry or similar
2. **Performance monitoring:** Add APM (Application Performance Monitoring)
3. **Rate limiting:** Adjust limits based on usage patterns
4. **Analytics:** Track endpoint usage and response times

---

## Support

For issues or questions:
1. Check server console for error logs
2. Verify authentication token is valid
3. Check user has admin role
4. Review request/response in browser DevTools
5. Refer to ADMIN_TESTING.md for testing procedures
