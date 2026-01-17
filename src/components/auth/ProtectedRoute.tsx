'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
    children: React.ReactNode
    allowedRoles?: string[]
    redirectTo?: string
}

export default function ProtectedRoute({
    children,
    allowedRoles,
    redirectTo = '/login'
}: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push(redirectTo)
            } else if (allowedRoles && !allowedRoles.includes(user.role)) {
                // Redirect to appropriate dashboard based on role
                const dashboards: Record<string, string> = {
                    admin: '/admin',
                    teacher: '/teacher',
                    student: '/student',
                    parent: '/parent',
                }
                router.push(dashboards[user.role] || '/')
            }
        }
    }, [user, loading, allowedRoles, router, redirectTo])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null
    }

    return <>{children}</>
}
