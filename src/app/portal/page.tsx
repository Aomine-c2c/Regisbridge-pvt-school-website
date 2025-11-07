'use client'

import StudentPortal from '@/components/StudentPortal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <StudentPortal />
      <Footer />
    </div>
  )
}
