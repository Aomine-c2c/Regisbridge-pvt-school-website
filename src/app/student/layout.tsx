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
                    <div className="p-6 flex justify-between items-center border-b border-gray-100">
                        <h1 className="text-xl font-bold text-brand-navy">My Portal</h1>
                        {/* Close button for mobile - Larger touch target */}
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden size-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors touch-target"
                            aria-label="Close menu"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <nav className="px-3 py-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 min-h-[48px] rounded-lg transition-all duration-200 ${
                                        isActive 
                                            ? 'bg-brand-navy text-white shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                    <span className="font-medium text-base">{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Header - Enhanced Touch Targets */}
                    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="size-12 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-target"
                            aria-label="Open menu"
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
