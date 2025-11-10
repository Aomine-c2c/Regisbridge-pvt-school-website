'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LogOut, GraduationCap, Bell, Settings } from 'lucide-react'
import { Overview } from '@/components/admin/Overview'
import { UserManagement } from '@/components/admin/UserManagement'
import { StudentManagement } from '@/components/admin/StudentManagement'
import { ContentManagement } from '@/components/admin/ContentManagement'
import { AcademicManagement } from '@/components/admin/AcademicManagement'
import { FinanceManagement } from '@/components/admin/FinanceManagement'
import { ReportsAnalytics } from '@/components/admin/ReportsAnalytics'
import { AttendanceManagement } from '@/components/admin/AttendanceManagement'
import { SystemSettings } from '@/components/admin/SystemSettings'
import { NotificationCenter } from '@/components/admin/NotificationCenter'

export default function AdminPage() {
  const { user, logout, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3) // Mock unread count

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C1A75] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Only admins and superadmins can access this page
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    redirect('/')
  }

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-[#1C1A75]" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Regisbridge School Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
              </div>
              
              {/* Notification Bell */}
              <div className="relative">
                <Button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)} 
                  variant="ghost" 
                  size="sm"
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                {notificationsOpen && (
                  <NotificationCenter 
                    onClose={() => setNotificationsOpen(false)}
                    onClearUnread={() => setUnreadCount(0)}
                  />
                )}
              </div>
              
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><Overview /></TabsContent>
          <TabsContent value="users"><UserManagement /></TabsContent>
          <TabsContent value="students"><StudentManagement /></TabsContent>
          <TabsContent value="attendance"><AttendanceManagement /></TabsContent>
          <TabsContent value="content"><ContentManagement /></TabsContent>
          <TabsContent value="academics"><AcademicManagement /></TabsContent>
          <TabsContent value="finance"><FinanceManagement /></TabsContent>
          <TabsContent value="reports"><ReportsAnalytics /></TabsContent>
          <TabsContent value="settings"><SystemSettings /></TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
