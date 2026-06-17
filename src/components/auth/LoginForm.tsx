'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LoginForm() {
    // ... state declarations ...
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    
    // Determine default tab logic
    const from = searchParams.get('from') || ''
    const roleParam = searchParams.get('role') || ''
    
    const [activeTab, setActiveTab] = useState(() => {
        if (roleParam === 'student' || from.includes('student')) return 'student'
        if (roleParam === 'parent' || from.includes('parent')) return 'parent'
        if (roleParam === 'staff' || from.includes('admin') || from.includes('teacher')) return 'staff'
        return 'student'
    })

    // Update tab if URL changes
    useEffect(() => {
        if (roleParam === 'student' || from.includes('student')) setActiveTab('student')
        else if (roleParam === 'parent' || from.includes('parent')) setActiveTab('parent')
        else if (roleParam === 'staff' || from.includes('admin') || from.includes('teacher')) setActiveTab('staff')
    }, [from, roleParam])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const user = await login(email, password)
            
            // Optional: Check if role matches tab? 
            // For now, we allow login but maybe warn if role is drastically different?
            // Actually, best to just let them in. The portal they see corresponds to their actual role.
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true')
            }
            
                // Redirect based on role if no specific 'from'
            if (!from) {
                if (user?.role === 'SUPERUSER') {
                     if (activeTab === 'student') router.push('/student')
                     else if (activeTab === 'parent') router.push('/parent')
                     else router.push('/dashboard')
                }
                else if (user?.role === 'student') router.push('/student')
                else if (user?.role === 'parent') router.push('/parent')
                else if (['admin', 'teacher', 'staff'].includes(user?.role || '')) router.push('/dashboard')
                else router.push('/dashboard')
            } else {
                router.push('/dashboard') // AuthContext/Middleware usually handles redirect back to 'from' via router?
                // Actually AuthContext logic:
                // Login returns user. Component calls router.push().
                // We should push to 'from' if it exists.
                if (user?.role === 'SUPERUSER') {
                     // Even if 'from' exists, maybe we prioritize 'from'? 
                     // Yes, if deep connecting.
                     router.push(from)
                } else {
                    const redirectUrl = from || (
                        user?.role === 'student' ? '/student' :
                        user?.role === 'parent' ? '/parent' :
                        '/dashboard'
                    )
                    router.push(redirectUrl)
                }
            }
        } catch (err: any) {
            // Enhanced, actionable error messages
            const errorMessage = err.message || 'Login failed. Please try again.'
            
            if (errorMessage.includes('Invalid')) {
                setError('Invalid email or password. Please check your credentials and try again.')
            } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
                setError('Network error. Please check your connection and try again.')
            } else if (errorMessage.includes('timeout')) {
                setError('Request timed out. Please try again.')
            } else {
                setError(errorMessage)
            }
        } finally {
            setLoading(false)
        }
    }

    const getTabConfig = () => {
        switch(activeTab) {
            case 'parent':
                return {
                    title: 'Parent Portal',
                    description: 'Access your child\'s academic progress and school updates',
                    icon: 'family_restroom',
                    colorClass: 'text-green-700',
                    bgClass: 'bg-green-50'
                }
            case 'staff':
                return {
                    title: 'Staff Access',
                    description: 'Administrative and faculty secure login',
                    icon: 'admin_panel_settings',
                    colorClass: 'text-brand-navy',
                    bgClass: 'bg-brand-navy/5'
                }
            case 'student':
            default:
                return {
                    title: 'Student Portal',
                    description: 'Access your courses, grades, and resources',
                    icon: 'school',
                    colorClass: 'text-brand-gold-dark',
                    bgClass: 'bg-brand-gold/10'
                }
        }
    }

    const config = getTabConfig()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy mb-4 shadow-lg hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-3xl text-brand-gold">school</span>
                    </a>
                    <h1 className="text-2xl font-bold text-gray-900">Regisbridge Academy</h1>
                    <p className="text-gray-600 mt-1">Excellence in Education</p>
                </div>

                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-white shadow-sm border border-gray-200">
                        <TabsTrigger value="student" className="data-[state=active]:bg-brand-gold/10 data-[state=active]:text-brand-navy font-semibold">Student</TabsTrigger>
                        <TabsTrigger value="parent" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 font-semibold">Parent</TabsTrigger>
                        <TabsTrigger value="staff" className="data-[state=active]:bg-brand-navy/5 data-[state=active]:text-brand-navy font-semibold">Staff</TabsTrigger>
                    </TabsList>

                    <Card className="shadow-xl border-0 overflow-hidden relative">
                         {/* Dynamic colored top border */}
                         <div className={`absolute top-0 left-0 w-full h-1.5 ${
                            activeTab === 'student' ? 'bg-brand-gold' : 
                            activeTab === 'parent' ? 'bg-green-600' : 
                            'bg-brand-navy'
                        }`}></div>

                        <CardHeader className="space-y-1 pb-6 pt-8">
                            <div className="flex justify-center mb-2">
                                <span className={`material-symbols-outlined text-4xl ${config.colorClass}`}>{config.icon}</span>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center text-gray-900">{config.title}</CardTitle>
                            <CardDescription className="text-center text-base px-4">
                                {config.description}
                            </CardDescription>
                        </CardHeader>
                        
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-5">
                                {/* Error Display */}
                                {error && (
                                    <div className="flex items-start gap-3 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                                        <span className="material-symbols-outlined text-red-600 flex-shrink-0 mt-0.5">error</span>
                                        <div className="flex-1">
                                            <p className="font-semibold mb-1">Login Failed</p>
                                            <p>{error}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-xl">mail</span>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={activeTab === 'student' ? "student@regisbridge.edu" : "name@example.com"}
                                            value={email}
                                            onChange={(e: any) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                            className="pl-11 h-12 border-gray-300 focus:border-brand-navy focus:ring-brand-navy"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-xl">lock</span>
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e: any) => setPassword(e.target.value)}
                                            required
                                            disabled={loading}
                                            className="pl-11 pr-11 h-12 border-gray-300 focus:border-brand-navy focus:ring-brand-navy"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            tabIndex={-1}
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <Checkbox 
                                            id="remember"
                                            checked={rememberMe}
                                            onCheckedChange={(checked: any) => setRememberMe(checked as boolean)}
                                            disabled={loading}
                                        />
                                        <label htmlFor="remember" className="cursor-pointer select-none text-gray-700 font-medium">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link 
                                        href="/forgot-password" 
                                        className="text-brand-navy hover:text-brand-gold font-semibold transition-colors"
                                        tabIndex={loading ? -1 : 0}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4 pt-2">
                                <Button 
                                    type="submit" 
                                    className={`w-full h-12 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 ${
                                        activeTab === 'parent' ? 'bg-green-700 hover:bg-green-800' :
                                        activeTab === 'student' ? 'bg-brand-gold hover:bg-brand-gold-dark text-brand-navy' :
                                        'bg-brand-navy hover:bg-brand-navy-light'
                                    }`} 
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            <span>Signing in...</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <span>Access {config.title}</span>
                                            <span className="material-symbols-outlined text-xl">login</span>
                                        </span>
                                    )}
                                </Button>

                                <div className="relative w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-white px-2 text-gray-500">No account?</span>
                                    </div>
                                </div>

                                <Link
                                    href="/register"
                                    className="w-full h-12 flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-brand-navy rounded-md font-semibold text-gray-700 hover:text-brand-navy transition-all duration-300"
                                    tabIndex={loading ? -1 : 0}
                                >
                                    <span>Register New Account</span>
                                </Link>
                            </CardFooter>
                        </form>
                    </Card>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        <span className="material-symbols-outlined text-base inline align-middle mr-1">help</span>
                        Need help? Contact{' '}
                        <a href="mailto:support@regisbridge.edu" className="text-brand-navy hover:text-brand-gold font-semibold transition-colors">
                            support@regisbridge.edu
                        </a>
                    </p>
                </Tabs>
            </div>
        </div>
    )
}


