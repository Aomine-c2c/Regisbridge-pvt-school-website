import { render, screen, waitFor } from '@testing-library/react'
import ProtectedRoute from '../ProtectedRoute'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock useAuth
const mockUseAuth = jest.fn()
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}))

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children when user role matches permitted role (case sensitive in DB)', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'admin', email: 'admin@test.com' },
      loading: false,
    })

    render(
      <ProtectedRoute allowedRoles={['admin']}>
        <div data-testid="child-content">Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('renders children when user role matches permitted role (mixed case in DB)', async () => {
    // This is the CRITICAL test case for the user's issue
    mockUseAuth.mockReturnValue({
      user: { role: 'Admin', email: 'admin@test.com' },
      loading: false,
    })

    render(
      <ProtectedRoute allowedRoles={['admin']}>
        <div data-testid="child-content">Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
  })
  
  it('renders children when user role matches permitted role (uppercase in DB)', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'ADMIN', email: 'admin@test.com' },
      loading: false,
    })

    render(
      <ProtectedRoute allowedRoles={['admin']}>
        <div data-testid="child-content">Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('redirects to home if user role is not allowed', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'student', email: 'student@test.com' },
      loading: false,
    })

    render(
      <ProtectedRoute allowedRoles={['admin']}>
        <div data-testid="child-content">Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.queryByTestId('child-content')).not.toBeInTheDocument()
    await waitFor(() => {
        // dashboards['student'] -> /student
        // BUT logic is: if (!isAllowed) -> dashboards[userRole] -> /student.
        // Wait, if I am a student trying to access admin, 
        // I should be redirected to MY dashboard (/student), not home.
        // Let's verify what the code does.
        // The code extracts role, checks map. 
        // dashboards = { admin: '/admin', ... student: '/student' ... }
        // So it should go to /student.
      expect(mockPush).toHaveBeenCalledWith('/student')
    })
  })
  
  it('redirects to home if user role has no dashboard', async () => {
      mockUseAuth.mockReturnValue({
        user: { role: 'unknown', email: 'unknown@test.com' },
        loading: false,
      })
  
      render(
        <ProtectedRoute allowedRoles={['admin']}>
          <div data-testid="child-content">Protected Content</div>
        </ProtectedRoute>
      )
  
      expect(screen.queryByTestId('child-content')).not.toBeInTheDocument()
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/')
      })
    })
})
