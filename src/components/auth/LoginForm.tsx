'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login(email, password)
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true')
            }
            
            router.push('/dashboard')
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-navy mb-4">
                        <span className="material-symbols-outlined text-3xl text-brand-gold">school</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Regisbridge Academy</h1>
                    <p className="text-gray-600 mt-1">School Management Portal</p>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
                        <CardDescription className="text-center text-base">
                            Sign in to access your portal
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5">
                            {/* Enhanced Error Display */}
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
                                        placeholder="name@regisbridge.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="pl-11 h-12 border-gray-300 focus:border-brand-navy focus:ring-brand-navy"
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            {/* Password Field with Toggle */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-xl">lock</span>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="remember"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
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
                            {/* Enhanced Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        <span>Signing in...</span>
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <span>Sign In</span>
                                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                    </span>
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="bg-white px-2 text-gray-500">New to Regisbridge?</span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <Link
                                href="/register"
                                className="w-full h-12 flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-brand-navy rounded-md font-semibold text-gray-700 hover:text-brand-navy transition-all duration-300"
                                tabIndex={loading ? -1 : 0}
                            >
                                <span>Create Account</span>
                                <span className="material-symbols-outlined text-xl">person_add</span>
                            </Link>
                        </CardFooter>
                    </form>
                </Card>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    <span className="material-symbols-outlined text-base inline align-middle mr-1">help</span>
                    Need help? Contact{' '}
                    <a href="mailto:support@regisbridge.edu" className="text-brand-navy hover:text-brand-gold font-semibold transition-colors">
                        support@regisbridge.edu
                    </a>
                </p>
            </div>
        </div>
    )
}
