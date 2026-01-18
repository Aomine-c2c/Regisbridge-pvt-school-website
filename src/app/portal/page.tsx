'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PortalPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to student portal
    router.replace('/student')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to portal...</p>
      </div>
    </div>
  )
}
