import { render, screen, waitFor } from '@testing-library/react'
import DashboardPage from '../page'

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

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects ADMIN (uppercase) role to /admin', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'ADMIN', email: 'admin@test.com' },
      loading: false,
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin')
    })
  })

  it('redirects admin (lowercase) role to /admin', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'admin', email: 'admin@test.com' },
      loading: false,
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin')
    })
  })

  it('redirects mixed case Admin role to /admin', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'Admin', email: 'admin@test.com' },
      loading: false,
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin')
    })
  })

  it('redirects unknown role to /', async () => {
    mockUseAuth.mockReturnValue({
      user: { role: 'unknown', email: 'test@test.com' },
      loading: false,
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })
})
