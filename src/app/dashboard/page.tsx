'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            // Redirect based on role
            const role = user.role.toLowerCase().trim()
            
            switch (role) {
                case 'admin':
                case 'administrator':
                case 'superadmin':
                    router.push('/admin')
                    break
                case 'teacher':
                    router.push('/teacher')
                    break
                case 'student':
                    router.push('/student')
                    break
                case 'parent':
                    router.push('/parent')
                    break
                case 'staff':
                    router.push('/staff')
                    break
                default:
                    // If role is unrecognized, redirect to home
                    router.push('/')
                    break
            }
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
