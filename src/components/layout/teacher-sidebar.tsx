"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  FileText,
  Star,
  Megaphone,
  Mail,
  BarChart3,
  BookOpen
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  { href: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/teacher/classes', icon: Users, label: 'My Classes' },
  { href: '/teacher/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { href: '/teacher/assignments', icon: FileText, label: 'Assignments' },
  { href: '/teacher/grades', icon: Star, label: 'Gradebook' },
  { href: '/teacher/announcements', icon: Megaphone, label: 'Announcements' },
  { href: '/teacher/messages', icon: Mail, label: 'Messages' },
  { href: '/teacher/analytics', icon: BarChart3, label: 'Analytics' },
]

export function TeacherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible={true} {...props} className="border-r border-slate-200">
      <SidebarHeader className="bg-white p-4">
        <div className="flex items-center gap-2 font-bold text-brand-navy px-2">
            <BookOpen className="size-6 text-brand-blue" />
            <span className="truncate group-data-[collapsible=icon]:hidden">Teacher Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="px-2 py-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={pathname === item.href}
                className="hover:bg-slate-100 text-slate-700 data-[active=true]:bg-brand-blue/10 data-[active=true]:text-brand-blue font-medium"
              >
                <Link href={item.href}>
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-white p-4">
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
