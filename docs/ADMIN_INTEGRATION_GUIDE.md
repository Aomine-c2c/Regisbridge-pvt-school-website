# Admin Portal - Integration Guide

This guide shows how to use the new **API Client** and **Validation Schemas** to modernize admin components.

## Quick Start

### 1. Use the Centralized API Client

**Before:**
```tsx
const response = await fetch(`/api/admin/users?page=${page}`)
const data = await response.json()
if (response.ok) {
  setUsers(data.users)
}
```

**After:**
```tsx
import { apiClient } from '@/lib/api-client'

const data = await apiClient.get<{ users: User[] }>(`/api/admin/users?page=${page}`)
setUsers(data.users)
```

**Benefits:**
- ✅ Automatic retry logic with exponential backoff
- ✅ Proper auth header injection (Bearer token)
- ✅ Error handling with specific status codes
- ✅ Timeout handling (10s default)
- ✅ Simple method chaining (get, post, put, delete)

---

### 2. Add Form Validation

**Before:**
```tsx
const handleCreateUser = async (e) => {
  e.preventDefault()
  // No validation, just send
  const response = await fetch('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
}
```

**After:**
```tsx
import { createUserSchema, type CreateUserInput } from '@/lib/schemas/admin-schemas'
import { apiClient, ApiError } from '@/lib/api-client'

const handleCreateUser = async (formData: CreateUserInput) => {
  try {
    // Validate first
    const validated = createUserSchema.parse(formData)
    
    // Then submit
    const result = await apiClient.post('/api/admin/users', validated)
    toast({ title: 'Success', description: 'User created' })
    setIsCreateOpen(false)
  } catch (error) {
    if (error instanceof ZodError) {
      // Show validation errors
      error.errors.forEach(err => {
        toast({ 
          description: `${err.path}: ${err.message}`,
          variant: 'destructive' 
        })
      })
    } else if (error instanceof ApiError) {
      // Show API errors
      toast({ 
        description: error.message,
        variant: 'destructive' 
      })
    }
  }
}
```

---

### 3. Complete Example: UserManagement Refactor

```tsx
'use client'

import { useState } from 'react'
import { apiClient, ApiError } from '@/lib/api-client'
import { createUserSchema, type CreateUserInput } from '@/lib/schemas/admin-schemas'
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  status: string
  createdAt: string
}

export default function UserManagement() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ New: Use useCallback + useMemo for performance
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<{ users: User[] }>('/api/admin/users', {
        retries: 3, // Override default retries
      })
      setUsers(data.users ?? [])
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : 'Failed to load users'
      setError(message)
      toast({ description: message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  // ✅ New: Validated form submission
  const handleCreateUser = async (formData: CreateUserInput) => {
    try {
      // Validate
      const validated = createUserSchema.parse(formData)
      
      // Submit with validated data
      await apiClient.post('/api/admin/users', validated)
      
      toast({ title: 'Success', description: 'User created successfully' })
      setIsCreateOpen(false)
      await fetchUsers() // Refresh list
      
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Type-safe validation errors
        err.errors.forEach(error => {
          toast({
            description: `${error.path.join('.')}: ${error.message}`,
            variant: 'destructive'
          })
        })
      } else if (err instanceof ApiError) {
        toast({ description: err.message, variant: 'destructive' })
      }
    }
  }

  // ✅ New: Improved delete with confirmation
  const handleDelete = async (userId: string) => {
    if (!confirm('Delete this user permanently?')) return
    
    try {
      await apiClient.delete(`/api/admin/users/${userId}`)
      toast({ title: 'Deleted', description: 'User removed' })
      await fetchUsers()
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Delete failed'
      toast({ description: message, variant: 'destructive' })
    }
  }

  // Component JSX continues...
  return (
    // ... UI JSX ...
  )
}
```

---

## Available Schemas

The following schemas are ready to use:

| Schema | Path | Purpose |
|--------|------|---------|
| `createUserSchema` | `/lib/schemas/admin-schemas` | Validate new user creation |
| `updateUserSchema` | `/lib/schemas/admin-schemas` | Validate user updates |
| `enrollStudentSchema` | `/lib/schemas/admin-schemas` | Validate student enrollment |
| `recordPaymentSchema` | `/lib/schemas/admin-schemas` | Validate fee payment entry |
| `addStaffSchema` | `/lib/schemas/admin-schemas` | Validate staff onboarding |
| `emailSettingsSchema` | `/lib/schemas/admin-schemas` | Validate email config |
| `backupSettingsSchema` | `/lib/schemas/admin-schemas` | Validate backup settings |

See `/lib/schemas/admin-schemas.ts` for full list.

---

## Error Handling Pattern

```tsx
try {
  const result = await apiClient.post('/api/admin/users', data)
  // Success
} catch (error) {
  if (error instanceof ApiError) {
    // API-specific error (has status code)
    if (error.status === 401) {
      // Unauthorized - user redirected to /login automatically
    } else if (error.status === 403) {
      // Forbidden
      toast({ description: 'You do not have permission', variant: 'destructive' })
    } else if (error.status === 409) {
      // Conflict (e.g., duplicate email)
      toast({ description: error.message, variant: 'destructive' })
    }
  } else if (error instanceof z.ZodError) {
    // Client-side validation error
    showValidationErrors(error.errors)
  } else {
    // Network/timeout error (already retried automatically)
    toast({ description: 'Network error, please try again', variant: 'destructive' })
  }
}
```

---

## Component Checklist

When refactoring an admin component, ensure:

- [ ] Replace `fetch()` with `apiClient.get/post/put/delete`
- [ ] Add Zod schema validation for all forms
- [ ] Import `ApiError` and handle specifically
- [ ] Add `error` state alongside `loading`
- [ ] Show error messages to user (not just console)
- [ ] Use `useCallback` for data-fetching functions
- [ ] Wrap with `AdminErrorBoundary` at page level
- [ ] Test form validation with invalid inputs
- [ ] Test API error handling (simulate 401, 500, etc.)

---

## Migration Priority

### Phase 1 (This Week)
- [ ] `UserManagement.tsx`
- [ ] `StudentManagement.tsx`
- [ ] `FinanceManagement.tsx`

### Phase 2 (Next Week)
- [ ] `StaffDirectory.tsx`
- [ ] `AttendanceManagement.tsx`
- [ ] `AdminDocumentManager.tsx`

### Phase 3 (Following Week)
- [ ] Remaining components
- [ ] Add React Query for advanced caching
- [ ] Add loading skeletons

---

## FAQ

**Q: Do I need to migrate all components at once?**
A: No. The new API client is backwards-compatible. Migrate one component at a time.

**Q: What about authentication? Where do I change from localStorage?**
A: See `/src/lib/api-client.ts` - it checks `sessionStorage` first, then `localStorage`. A server middleware should inject auth via `httpOnly` cookies soon.

**Q: Can I still use fetch() directly?**
A: Yes, but discouraged. Always use `apiClient` for consistency and automatic error handling.

**Q: How do I test with these new utilities?**
A: Mock `apiClient` in jest:
```tsx
jest.mock('@/lib/api-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  }
}))
```

---

## Support

For issues or questions, refer to:
- [Admin Portal Audit](ADMIN_PORTAL_AUDIT.md) – architecture overview
- [Zod Documentation](https://zod.dev) – schema validation
- [Next.js Documentation](https://nextjs.org/docs) – routing & API routes
