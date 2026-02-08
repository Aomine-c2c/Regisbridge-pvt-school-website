'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()

    const navItems = [
        { href: '/student', icon: 'dashboard', label: 'Dashboard' },
        { href: '/student/timetable', icon: 'calendar_month', label: 'Timetable' },
        { href: '/student/attendance', icon: 'fact_check', label: 'Attendance' },
        { href: '/student/assignments', icon: 'assignment', label: 'Assignments' },
        { href: '/student/grades', icon: 'school', label: 'Grades' },
    ]

    return (
        <ProtectedRoute allowedRoles={['student']}>
            <div className="flex h-screen bg-gray-50">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 bg-white border-r border-gray-200 flex-shrink-0
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="p-6 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-brand-navy">My Portal</h1>
                        {/* Close button for mobile */}
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <nav className="px-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive 
                                            ? 'bg-brand-navy text-white'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Header */}
                    <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            <span className="material-symbols-outlined text-2xl">menu</span>
                        </button>
                        <h1 className="text-lg font-bold text-brand-navy">Student Portal</h1>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
