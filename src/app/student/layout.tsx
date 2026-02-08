'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
            <div className="flex h-screen bg-gray-50">
                {/* Apps & Navigation Sidebar */}
                <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
                     <div className="p-6">
                        <h1 className="text-xl font-bold text-brand-navy">My Portal</h1>
                    </div>
                    <nav className="px-4 space-y-2">
                        <a href="/student" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="font-medium">Dashboard</span>
                        </a>
                        <a href="/student/timetable" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined">calendar_month</span>
                            <span className="font-medium">Timetable</span>
                        </a>
                         <a href="/student/attendance" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                            <span className="material-symbols-outlined">fact_check</span>
                            <span className="font-medium">Attendance</span>
                        </a>
                        <a href="/student/assignments" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
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
        
    )
}
