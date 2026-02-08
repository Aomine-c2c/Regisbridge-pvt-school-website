'use client'

import { useState, useEffect } from 'react'
import { AdminHeader } from '@/components/admin/shared/AdminHeader'
import { RegistrationStats } from '@/components/admin/RegistrationStats'
import { RegistrationGenerator } from '@/components/admin/RegistrationGenerator'
import { useToast } from '@/components/ui/use-toast'

export default function RegistrationNumbersPage() {
  const { toast } = useToast()
  const [stats, setStats] = useState({
    total: 0,
    nextStudent: '...',
    nextTeacher: '...'
  })

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/registration-numbers')
      const data = await res.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch stats', error)
      toast({ 
          title: 'Error', 
          description: 'Could not load current statistics',
          variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="space-y-8 p-8">
      <AdminHeader
        title="Registration Numbers"
        description="Manage and generate unique student and staff identifiers (RS/RT)."
      />

      <RegistrationStats stats={stats} />

      <div className="mt-8">
        <RegistrationGenerator onGenerate={fetchStats} />
      </div>
    </div>
  )
}
