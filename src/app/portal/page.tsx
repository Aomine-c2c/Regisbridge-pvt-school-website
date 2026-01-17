'use client'

import StudentPortal from '@/components/StudentPortal'
import { Header, Footer } from '@/components/layout'

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StudentPortal />
      <Footer />
    </div>
  )
}
