'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import UserManagement from '@/components/admin/UserManagement'

export default function AdminUsersPage() {
    const { logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.push('/admin')}>
                            ← Back
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">User Management</h1>
                            <p className="text-sm text-muted-foreground">Manage system users</p>
                        </div>
                    </div>
                    <Button onClick={handleLogout} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <UserManagement />
            </main>
        </div>
    )
}
