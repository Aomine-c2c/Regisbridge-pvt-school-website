import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <div className="mb-8 p-6 bg-destructive/10 rounded-full">
        <ShieldAlert className="h-16 w-16 text-destructive" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-4">Access Denied</h1>
      
      <p className="text-muted-foreground max-w-md mb-8">
        You do not have permission to access this page. Please contact your administrator if you believe this is an mistake.
      </p>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}
