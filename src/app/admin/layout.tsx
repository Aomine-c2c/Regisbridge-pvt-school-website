'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminDashboard from './page'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      {children}
    </ProtectedRoute>
  )
}
