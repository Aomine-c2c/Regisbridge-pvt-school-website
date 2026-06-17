"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  FileText,
  GraduationCap,
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
    { href: '/student', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/student/timetable', icon: Calendar, label: 'Timetable' },
    { href: '/student/attendance', icon: ClipboardCheck, label: 'Attendance' },
    { href: '/student/assignments', icon: FileText, label: 'Assignments' },
    { href: '/student/grades', icon: GraduationCap, label: 'Grades' },
]

export function StudentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible={true} {...props} className="border-r border-slate-200">
      <SidebarHeader className="bg-white p-4">
        <div className="flex items-center gap-2 font-bold text-brand-navy px-2">
            <BookOpen className="size-6 text-brand-gold" />
            <span className="truncate group-data-[collapsible=icon]:hidden">My Portal</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="px-2 py-4">
          {navItems.map((item: any) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={pathname === item.href}
                className="hover:bg-slate-100 text-slate-700 data-[active=true]:bg-brand-gold/10 data-[active=true]:text-brand-gold-dark font-medium"
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
