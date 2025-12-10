'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

/**
 * Admin Layout - SECURITY TEMPORARILY DISABLED FOR TESTING
 * 
 * TODO: Re-enable security checks before production deployment
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // SECURITY DISABLED - Allow all access for testing
  // useEffect(() => {
  //   if (!isLoading) {
  //     const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
  //     if (!isAdmin) {
  //       router.replace('/')
  //     }
  //   }
  // }, [user, isLoading, router])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C1A75] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // SECURITY DISABLED - Render admin content for all users
  return <>{children}</>
}
