'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { TeacherSidebar } from "@/components/layout/teacher-sidebar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from 'next/navigation'

export default function TeacherLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    // Simple breadcrumb logic - extend as needed
    const pageName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'

    return (
        <ProtectedRoute allowedRoles={['teacher']}>
            <SidebarProvider>
                <TeacherSidebar />
                <SidebarInset>
                     <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-lg font-semibold capitalize text-brand-navy">{pageName}</h1>
                    </header>
                    <main className="flex-1 flex flex-col p-4 md:p-6 bg-slate-50 overflow-y-auto">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    )
}

