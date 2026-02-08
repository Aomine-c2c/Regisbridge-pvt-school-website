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
                console.log('ProtectedRoute: No user found, redirecting to login')
                router.push(redirectTo)
                return
            }

            const userRole = user.role.toLowerCase().trim()
            console.log(`ProtectedRoute: Checking access. User Role: "${user.role}" (normalized: "${userRole}"), Allowed Roles: ${JSON.stringify(allowedRoles)}`)
            
            const isAllowed = allowedRoles 
                ? allowedRoles.some(r => r.toLowerCase().trim() === userRole)
                : true

            console.log(`ProtectedRoute: Access Allowed? ${isAllowed}`)

            if (!isAllowed) {
                console.log('ProtectedRoute: Access denied. Redirecting...')
                // Redirect to appropriate dashboard based on role
                const dashboards: Record<string, string> = {
                    admin: '/admin',
                    teacher: '/teacher',
                    student: '/student',
                    parent: '/parent',
                }
                const dashboard = dashboards[userRole]
                console.log(`ProtectedRoute: Redirecting to ${dashboard || '/'}`)
                router.push(dashboard || '/')
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

    const userRole = user.role.toLowerCase().trim()
    const isAllowed = allowedRoles 
        ? allowedRoles.some(r => r.toLowerCase().trim() === userRole)
        : true

    if (!isAllowed) {
        return null
    }

    return <>{children}</>
}
