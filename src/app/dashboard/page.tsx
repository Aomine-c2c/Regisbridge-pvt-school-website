'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            // Route to appropriate dashboard based on role
            const dashboards: Record<string, string> = {
                admin: '/admin',
                teacher: '/teacher',
                student: '/student',
                parent: '/parent',
            }

            const destination = dashboards[user.role] || '/'
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
