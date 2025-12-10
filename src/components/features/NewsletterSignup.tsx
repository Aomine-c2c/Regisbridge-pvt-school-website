'use client'

import { useState, useCallback, memo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'

export const NewsletterSignup = memo(function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
        toast({
          title: 'Successfully Subscribed!',
          description: 'Thank you for subscribing to our newsletter.',
        })
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000)
      } else {
        toast({
          title: 'Subscription Failed',
          description: data.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Unable to subscribe. Please check your connection.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Stay Updated
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Subscribe to our newsletter for the latest news, events, and updates from Regisbridge.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isSuccess}
            className="w-full pr-10"
            aria-label="Email address for newsletter"
          />
          {isSuccess && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600 dark:text-green-400" />
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || isSuccess || !email}
          className="min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Subscribed!
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
})
