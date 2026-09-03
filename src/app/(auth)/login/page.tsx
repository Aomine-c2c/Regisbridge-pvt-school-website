import { Suspense } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
    let settings = null
    try {
        settings = await prisma.systemSettings.findFirst()
    } catch {
        // Database may be unreachable during static prerendering / build phase
    }
    if (settings && !settings.setupCompleted) {
        redirect('/welcome')
    }
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy"></div></div>}>
            <LoginForm />
        </Suspense>
    )
}
