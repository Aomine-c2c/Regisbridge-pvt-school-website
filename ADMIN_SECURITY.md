# Admin Security Implementation

## Overview
This document outlines the multi-layer security approach protecting admin-only features in the Regisbridge School website.

## Protection Layers

### 1. Client-Side UI Gating
**Files:**
- `src/components/Header.tsx` - Hides "Dashboard" navigation link from non-admin users
- `src/app/page.tsx` - Conditionally renders DataVisualization component only for admin/superadmin users

**Mechanism:**
```typescript
const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
```

**Purpose:** Prevents UI clutter and provides immediate visual feedback about user permissions.

**Note:** This is NOT a security boundary - determined users can modify client code.

---

### 2. Admin Route Layout Protection
**File:** `src/app/admin/layout.tsx`

**Mechanism:**
- Wraps all `/admin/*` routes with authentication check
- Uses `useAuth()` hook to verify user role on client mount
- Automatically redirects unauthorized users to home page (`/`)
- Returns `null` during auth loading or if user lacks admin privileges

**Protected Routes:**
- `/admin` - Main admin dashboard
- `/admin/data-entry` - Data entry forms
- Any future admin subroutes

**Code:**
```typescript
useEffect(() => {
  if (!isLoading) {
    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
    if (!isAdmin) {
      router.replace('/')
    }
  }
}, [user, isLoading, router])
```

**Purpose:** Prevents unauthorized access to admin pages even if user manually navigates to the URL.

---

### 3. Admin Page Component Protection
**File:** `src/app/admin/page.tsx`

**Mechanism:**
- Double-checks authentication within the page component itself
- Shows loading spinner while auth state resolves
- Uses Next.js `redirect()` to send non-admin users to home page

**Code:**
```typescript
if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
  redirect('/')
}
```

**Purpose:** Defense-in-depth - ensures page content never renders for unauthorized users.

---

### 4. API Route Protection
**Files:**
- `src/app/api/admin/users/route.ts`
- `src/app/api/admin/registration-numbers/route.ts`

**Mechanism:**
- Every admin API endpoint calls `requireAdmin(request)` before processing
- Verifies JWT token from `Authorization: Bearer` header
- Checks that decoded token contains `role: 'admin'` or `role: 'superadmin'`
- Returns `401 Unauthorized` if no token, `403 Forbidden` if insufficient privileges

**Middleware:** `src/lib/auth-middleware.ts`

**Code:**
```typescript
export async function requireAdmin(request: NextRequest) {
  const { user, error } = await verifyAuth(request)
  if (error) return { user: null, error }
  
  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      )
    }
  }
  return { user, error: null }
}
```

**Purpose:** **Primary security boundary** - prevents unauthorized API access regardless of client modifications.

---

## Security Boundaries

### Strong Boundary (API Routes)
✅ **Server-side enforcement** - Cannot be bypassed by client code  
✅ **Token verification** - Uses cryptographic JWT validation  
✅ **Role checking** - Validates user permissions before data access  

**Critical Note:** This is the ONLY layer that provides real security. All client-side checks are UX enhancements only.

### Weak Boundary (Client-Side)
⚠️ **UI convenience only** - Can be bypassed by modifying JavaScript  
⚠️ **Does NOT protect data** - Determined attackers can still make API calls  
⚠️ **Purpose:** Improve user experience, not enforce security  

---

## Authentication Flow

1. **User Login:**
   - POST to `/api/auth/login` with email/password
   - Server validates credentials and generates JWT token
   - Token stored in localStorage (`auth_token`)
   - User object stored in localStorage (`user`)

2. **Client-Side Auth Check:**
   - `AuthContext` loads token from localStorage on mount
   - Calls `/api/auth/verify` to validate token freshness
   - Updates React state with user object and `isAuthenticated` flag

3. **Admin Route Access:**
   - User navigates to `/admin`
   - Admin layout checks `user.role` via `useAuth()`
   - If not admin/superadmin: redirect to `/`
   - If authorized: render admin page

4. **API Call:**
   - Client makes request with `Authorization: Bearer <token>` header
   - Server calls `requireAdmin(request)` middleware
   - Middleware verifies token signature with JWT secret
   - Middleware checks decoded `role` field
   - Returns error response if checks fail, otherwise proceeds with request

---

## Admin Roles

| Role | Access Level | Can Access Admin Routes | Can Access Admin APIs |
|------|--------------|-------------------------|----------------------|
| `student` | Public | ❌ No | ❌ No |
| `parent` | Public | ❌ No | ❌ No |
| `teacher` | Public | ❌ No | ❌ No |
| `admin` | Administrator | ✅ Yes | ✅ Yes |
| `superadmin` | Super Administrator | ✅ Yes | ✅ Yes |

---

## Security Recommendations

### Current State
✅ **Good:** Multi-layer defense with proper API protection  
✅ **Good:** JWT-based authentication with role checking  
⚠️ **Improvement Needed:** Tokens stored in localStorage (vulnerable to XSS)  

### Future Enhancements (Production Hardening)

#### 1. Migrate to HTTP-Only Cookies
**Current:** Tokens in localStorage  
**Recommendation:** Store tokens in HTTP-only secure cookies  
**Benefit:** Prevents JavaScript access, mitigates XSS token theft  

**Implementation:**
- Update `/api/auth/login` to set cookies instead of returning tokens
- Create Next.js middleware (`middleware.ts`) to verify cookies on all admin routes
- Update `auth-middleware.ts` to read from cookies instead of headers

#### 2. Add CSRF Protection
**Current:** No CSRF tokens  
**Recommendation:** Implement CSRF token validation for state-changing operations  
**Benefit:** Prevents cross-site request forgery attacks  

#### 3. Rate Limiting
**Current:** Rate limiting exists for some routes  
**Recommendation:** Ensure all admin API endpoints have strict rate limits  
**Benefit:** Mitigates brute-force and automated attacks  

#### 4. Audit Logging
**Current:** No admin action logging  
**Recommendation:** Log all admin operations (user creation, deletion, edits)  
**Benefit:** Forensic analysis, compliance, accountability  

#### 5. Session Management
**Current:** Long-lived tokens with refresh mechanism  
**Recommendation:** Add session timeout and forced re-authentication for sensitive actions  
**Benefit:** Reduces window of opportunity for token compromise  

---

## Testing Admin Protection

### Manual Test Cases

**Test 1: Non-admin user attempts to access admin dashboard**
1. Register/login as student or parent
2. Navigate to `/admin` in browser
3. **Expected:** Immediately redirected to `/`

**Test 2: Unauthenticated user attempts to access admin dashboard**
1. Ensure logged out (clear localStorage)
2. Navigate to `/admin` in browser
3. **Expected:** Immediately redirected to `/`

**Test 3: Non-admin user attempts to call admin API**
1. Login as student
2. Get token from localStorage
3. Make API call: `curl -H "Authorization: Bearer <token>" https://regisbridge.page/api/admin/users`
4. **Expected:** `403 Forbidden` response

**Test 4: Unauthenticated API call**
1. Don't include Authorization header
2. Call: `curl https://regisbridge.page/api/admin/users`
3. **Expected:** `401 Unauthorized` response

**Test 5: Admin user successful access**
1. Login as admin
2. Navigate to `/admin`
3. **Expected:** Dashboard loads successfully
4. Make API call with admin token
5. **Expected:** `200 OK` with data

**Test 6: Dashboard link visibility**
1. View homepage as public user (not logged in)
2. **Expected:** No "Dashboard" link in header
3. Login as student/parent
4. **Expected:** Still no "Dashboard" link
5. Login as admin
6. **Expected:** "Dashboard" link appears in Academic dropdown

---

## Emergency Response

### Suspected Token Compromise
1. Change `JWT_SECRET` in environment variables (invalidates all tokens)
2. Force all users to re-login
3. Review audit logs for suspicious admin actions

### Unauthorized Admin Access
1. Check user table for role escalations
2. Review recent admin API calls
3. Investigate how user obtained admin role
4. Reset passwords for affected accounts

---

## Maintenance Checklist

- [ ] Review admin role assignments quarterly
- [ ] Audit admin API access logs monthly
- [ ] Test authentication flows after major updates
- [ ] Rotate JWT secrets annually
- [ ] Update dependencies with security patches

---

**Last Updated:** December 10, 2025  
**Version:** 2.3  
**Status:** Implemented ✅
