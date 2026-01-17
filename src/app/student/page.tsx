'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, ClipboardList, Trophy, User } from 'lucide-react'

export default function StudentPortal() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    const widgets = [
        { title: 'My Grades', description: 'View your academic performance', icon: Trophy, href: '/student/grades' },
        { title: 'Assignments', description: 'Upcoming and past assignments', icon: ClipboardList, href: '/student/assignments' },
        { title: 'Attendance', description: 'Your attendance record', icon: Calendar, href: '/student/attendance' },
        { title: 'Timetable', description: 'Class schedule and subjects', icon: BookOpen, href: '/student/timetable' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Student Portal</h1>
                        <p className="text-sm text-muted-foreground">
                            Welcome, {user?.firstName} {user?.lastName}
                            {user?.grade && ` • Grade ${user.grade}`}
                            {user?.studentId && ` • ${user.studentId}`}
                        </p>
                    </div>
                    <Button onClick={handleLogout} variant="outline">
                        Logout
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Card */}
                <Card className="mb-8 bg-gradient-to-r from-blue-500 to-teal-500 text-white border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Welcome Back!</CardTitle>
                        <CardDescription className="text-white/90">
                            Here's what's happening with your studies today
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-full">
                                <User className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="font-semibold">You're doing great!</p>
                                <p className="text-sm text-white/90">Keep up the excellent work</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Access Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {widgets.map((widget) => (
                        <Card key={widget.title} className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                            <CardHeader>
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <widget.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{widget.title}</CardTitle>
                                        <CardDescription className="text-sm">{widget.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Placeholder Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Assignments</CardTitle>
                            <CardDescription>Assignments due soon</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No assignments yet</p>
                                <p className="text-sm mt-2">Connect database to see your assignments</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Grades</CardTitle>
                            <CardDescription>Your latest test results</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No grades yet</p>
                                <p className="text-sm mt-2">Grades will appear here once available</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
