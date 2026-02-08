'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { AdminErrorBoundary } from '@/components/admin/AdminErrorBoundary'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { icon: 'dashboard', label: 'Overview', href: '/admin' },
    { icon: 'groups', label: 'User Management', href: '/admin/users' },
    { icon: 'school', label: 'Student Records', href: '/admin/students' },
    { icon: 'person', label: 'Staff Directory', href: '/admin/staff' },
    { icon: 'insert_chart', label: 'Analytics', href: '/admin/analytics' },
    { icon: 'co_present', label: 'Attendance', href: '/admin/attendance' },
    { icon: 'calendar_month', label: 'Timetable', href: '/admin/timetable' },
    { icon: 'badge', label: 'Registration No.', href: '/admin/registration-numbers' },
    { icon: 'settings', label: 'System Settings', href: '/admin/settings' },
  ]

  return (
    <ProtectedRoute allowedRoles={['admin', 'administrator']}>
      <div className="min-h-screen flex bg-gray-50">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 h-screen w-64 bg-brand-navy text-white p-6 shrink-0 overflow-y-auto z-30 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Admin Console</h2>
              <p className="text-sm text-gray-300 mt-1">Management Dashboard</p>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/10 p-1 rounded-md"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-brand-navy text-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-md">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-white/10 rounded-md"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="font-bold text-lg">Menu</span>
          </div>

          {/* Page Content */}
          <main className="flex-1">
            <AdminErrorBoundary>
              {children}
            </AdminErrorBoundary>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
