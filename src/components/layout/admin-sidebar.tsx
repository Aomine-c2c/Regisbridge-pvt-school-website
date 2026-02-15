"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  User,
  BarChart3,
  ClipboardCheck,
  Calendar,
  CreditCard,
  Settings,
  ShieldCheck,
  FileText,
  School,
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
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'User Management', href: '/admin/users' },
  { icon: GraduationCap, label: 'Students', href: '/admin/students' },
  { icon: School, label: 'Classes', href: '/admin/classes' },
  { icon: BookOpen, label: 'Subjects', href: '/admin/subjects' },
  { icon: User, label: 'Staff Directory', href: '/admin/staff' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: ClipboardCheck, label: 'Attendance', href: '/admin/attendance' },
  { icon: Calendar, label: 'Timetable', href: '/admin/timetable' },
  { icon: CreditCard, label: 'Finance', href: '/admin/finance' },
  { icon: FileText, label: 'Registration Nos.', href: '/admin/registration-numbers' },
  { icon: ShieldCheck, label: 'Roles & Permissions', href: '/admin/settings/roles' },
  { icon: ClipboardCheck, label: 'Audit Logs', href: '/admin/audit-logs' },
  { icon: Settings, label: 'System Settings', href: '/admin/settings' },
]

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible={true} {...props}>
      <SidebarHeader className="bg-brand-navy p-4">
        <div className="flex items-center gap-2 font-bold text-white px-2">
            <ShieldCheck className="size-6 text-brand-gold" />
            <span className="truncate group-data-[collapsible=icon]:hidden">Admin Console</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-brand-navy text-slate-300">
        <SidebarMenu className="px-2 py-4">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                isActive={pathname === item.href}
                className="hover:bg-brand-navy-light hover:text-white data-[active=true]:bg-brand-blue data-[active=true]:text-white"
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
      <SidebarFooter className="bg-brand-navy p-4">
         {/* Footer Content */}
         <div className="text-xs text-slate-400 group-data-[collapsible=icon]:hidden">
            v2.0.0
         </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
