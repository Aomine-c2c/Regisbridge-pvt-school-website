'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User, AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken')

        if (token) {
          const response = await fetch('/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            // Token invalid, clear and try refresh
            await refreshAuth()
          }
        }
      } catch (error) {
        console.error('Auth verification error:', error)
        // Clear tokens on any error
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.error('Server response was not JSON:', text.substring(0, 200)) // Log first 200 chars
        throw new Error('Server internal error (Invalid JSON response)')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      
      // Set cookie for Middleware (7 days)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=604800; SameSite=Strict; Secure`

      setUser(data.user)
      return data.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (registerData: {
    email: string
    password: string
    firstName: string
    lastName: string
    role: 'admin' | 'teacher' | 'student' | 'parent'
  }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      // Store tokens
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      // Set cookie for Middleware (7 days)
      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=604800; SameSite=Strict; Secure`

      setUser(data.user)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    
    // Clear cookie
    document.cookie = `accessToken=; path=/; max-age=0`
    setUser(null)

    // Call logout endpoint
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error)
  }

  const refreshAuth = async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('accessToken', data.accessToken)
        
        // Update cookie
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=604800; SameSite=Strict; Secure`

        // Verify new token and get user
        const verifyResponse = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${data.accessToken}`,
          },
        })

        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json()
          setUser(verifyData.user)
        }
      } else {
        // Refresh failed, clear tokens
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  const clearError = () => setError(null)

  const value: AuthContextType = {
    user,
    loading,
    isLoading: loading,
    isAuthenticated: !!user,
    error,
    clearError,
    login,
    register,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
