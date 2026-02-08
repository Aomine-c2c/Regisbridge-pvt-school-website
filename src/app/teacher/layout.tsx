'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function TeacherLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute allowedRoles={['teacher']}>
            <div className="flex h-screen bg-gray-50">
                {/* Simple Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-brand-navy">Teacher Portal</h1>
                    </div>
                    <nav className="px-4 space-y-2">
                        <a href="/teacher" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium">Dashboard</span>
                        </a>
                        <a href="/teacher/attendance" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined">co_present</span>
                            <span className="font-medium">Attendance</span>
                        </a>
                        {/* Placeholder for future links */}
                        <a href="/teacher/assignments" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined">assignment</span>
                            <span className="font-medium">Assignments</span>
                        </a>
                    </nav>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </ProtectedRoute>
    )
}
