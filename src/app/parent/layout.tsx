'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function ParentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute allowedRoles={['parent']}>
            {children}
        </ProtectedRoute>
    )
}
