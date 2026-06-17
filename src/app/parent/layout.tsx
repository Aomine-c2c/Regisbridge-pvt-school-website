'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ParentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: '/parent', icon: 'dashboard', label: 'Dashboard' },
        { href: '/parent/grades', icon: 'grade', label: 'Grades' },
        { href: '/parent/assignments', icon: 'assignment', label: 'Assignments' },
        { href: '/parent/attendance', icon: 'event_available', label: 'Attendance' },
        { href: '/parent/announcements', icon: 'campaign', label: 'Announcements' },
        { href: '/parent/messages', icon: 'mail', label: 'Messages' },
        { href: '/parent/reports', icon: 'description', label: 'Reports' },
    ];

    return (
        <ProtectedRoute allowedRoles={['parent']}>
            <div className="flex h-screen bg-gray-50">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                    <div className="flex flex-col h-full">
                        {/* Logo and Close Button */}
                        <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-brand-navy flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white">school</span>
                                </div>
                                <div>
                                    <h1 className="font-bold text-gray-900">Regisbridge</h1>
                                    <p className="text-xs text-gray-500">Parent Portal</p>
                                </div>
                            </div>
                            {/* Close button for mobile - Enhanced */}
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden size-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors touch-target"
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Navigation - Enhanced Touch Targets */}
                        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                            {navItems.map((item: any) => {
                                const isActive = pathname === item.href;
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
                                        <span className="material-symbols-outlined text-xl">
                                            {item.icon}
                                        </span>
                                        <span className="font-medium text-base">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Info */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-sm font-bold text-blue-600">PA</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">Parent Account</p>
                                    <p className="text-xs text-gray-500">parent@email.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile Header - Enhanced Touch Targets */}
                    <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="size-12 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-target"
                            aria-label="Open menu"
                        >
                            <span className="material-symbols-outlined text-2xl">menu</span>
                        </button>
                        <h2 className="font-bold text-gray-900 text-lg">Parent Portal</h2>
                        <div className="size-12"></div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
