'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Copy } from 'lucide-react'

interface GeneratedResult {
    registrationNumbers?: string[]
    registrationNumber?: string
}

export function RegistrationGenerator({ onGenerate }: { onGenerate: () => void }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [count, setCount] = useState(1)
  const [lastGenerated, setLastGenerated] = useState<string[]>([])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/registration-numbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          count: Math.max(1, Math.min(100, count))
        })
      })

      const data = await res.json()
      
      if (data.success) {
        const numbers = data.data.registrationNumber 
            ? [data.data.registrationNumber] 
            : data.data.registrationNumbers || []
            
        setLastGenerated(numbers)
        onGenerate() // Refresh stats
        toast({
          title: 'Success',
          description: `Generated ${numbers.length} registration number(s)`
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate numbers',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (lastGenerated.length === 0) return
    const text = lastGenerated.join('\n')
    navigator.clipboard.writeText(text)
    toast({ title: 'Copied', description: 'Numbers copied to clipboard' })
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Numbers</CardTitle>
          <CardDescription>Create new unique registration IDs for students or staff.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Role Type</Label>
            <RadioGroup defaultValue="student" onValueChange={(v) => setRole(v as any)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="r-student" />
                <Label htmlFor="r-student">Student (RS)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teacher" id="r-teacher" />
                <Label htmlFor="r-teacher">Teacher (RT)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Quantity</Label>
            <div className="flex gap-4 items-center">
                <Input 
                    type="number" 
                    min={1} 
                    max={100} 
                    value={count} 
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-32"
                />
                <span className="text-sm text-muted-foreground">Max 100 at a time</span>
            </div>
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate {role === 'student' ? 'Student' : 'Teacher'} ID{count > 1 ? 's' : ''}
          </Button>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Recent Output
            {lastGenerated.length > 0 && (
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                </Button>
            )}
          </CardTitle>
          <CardDescription>Recently generated numbers will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {lastGenerated.length > 0 ? (
            <div className="bg-muted p-4 rounded-lg max-h-[300px] overflow-y-auto font-mono text-sm">
                {lastGenerated.map((num, i) => (
                    <div key={i} className="py-1 border-b last:border-0 border-gray-200 dark:border-gray-700">
                        {num}
                    </div>
                ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                Only new numbers show here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
