import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'
import { AuthContext } from '@/contexts/AuthContext'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock toast
const mockToast = jest.fn()
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

describe('LoginForm Component', () => {
  const mockLogin = jest.fn()
  const mockAuthContext = {
    user: null,
    login: mockLogin,
    logout: jest.fn(),
    register: jest.fn(),
    isLoading: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render login form with all fields', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should toggle password visibility', async () => {
    const user = userEvent.setup()
    
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const passwordInput = screen.getByLabelText(/password/i)
    const toggleButton = screen.getByLabelText(/show password/i)

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Click to show password
    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')

    // Click to hide password again
    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should submit form with valid credentials', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValue({ success: true })

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@test.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123')
    })
  })

  it('should show validation error for invalid email', async () => {
    const user = userEvent.setup()

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    // HTML5 validation should prevent submission
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('should require both email and password', async () => {
    const user = userEvent.setup()

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    // HTML5 required validation should prevent submission
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('should show loading state during login', async () => {
    const user = userEvent.setup()
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)))

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@test.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    // Button should show loading state
    expect(submitButton).toBeDisabled()
  })

  it('should handle login errors gracefully', async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValue(new Error('Invalid credentials'))

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@test.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          variant: 'destructive',
        })
      )
    })
  })

  it('should have accessible form labels', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    // All form fields should have proper labels
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    expect(emailInput).toHaveAccessibleName()
    expect(passwordInput).toHaveAccessibleName()
  })

  it('should have proper ARIA attributes for password toggle button', () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>
    )

    const toggleButton = screen.getByLabelText(/show password/i)
    expect(toggleButton).toHaveAttribute('aria-label')
    expect(toggleButton).toHaveAttribute('type', 'button')
  })
})
