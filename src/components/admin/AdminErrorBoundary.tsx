'use client'

import { Component, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary for Admin Portal
 * Catches unexpected errors and displays fallback UI
 * Prevents entire admin section from crashing
 */
export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log to error reporting service in production
    console.error('Admin Error:', error)
    console.error('Component Stack:', errorInfo.componentStack)

    // Optionally send to Sentry/LogRocket/etc
    if (typeof window !== 'undefined' && window.__SENTRY__) {
      window.__SENTRY__.captureException(error, {
        contexts: { react: { componentStack: errorInfo.componentStack } },
      })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    // Optionally reload page
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
              </div>

              <p className="text-gray-600 mb-4">
                We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
              </p>

              {this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded p-3 mb-6">
                  <p className="text-sm text-red-700 font-mono break-words">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1 bg-brand-navy hover:bg-brand-navy/90"
                >
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = '/admin')}
                  className="flex-1"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

declare global {
  interface Window {
    __SENTRY__?: {
      captureException: (error: Error, context: unknown) => void
    }
  }
}
