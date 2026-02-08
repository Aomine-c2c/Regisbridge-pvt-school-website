'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            console.log('DashboardPage: User found:', user)
            console.log('DashboardPage: User role:', user.role)
            
            // Route to appropriate dashboard based on role
            const dashboards: Record<string, string> = {
                admin: '/admin',
                teacher: '/teacher',
                student: '/student',
                parent: '/parent',
            }

            const normalizedRole = user.role.toLowerCase().trim()
            console.log('DashboardPage: Normalized role:', normalizedRole)
            
            const destination = dashboards[normalizedRole] || '/'
            console.log('DashboardPage: Redirecting to:', destination)
            
            router.push(destination)
        } else if (!loading && !user) {
            // Not authenticated, redirect to login
            router.push('/login')
        }
    }, [user, loading, router])

    // Show loading state while redirecting
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Redirecting to your dashboard...</p>
            </div>
        </div>
    )
}
