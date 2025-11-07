'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import type { RegisterData } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Mail, Lock, User, Eye, EyeOff, Check, X } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'student',
    grade: '',
    studentId: '',
  });
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Password strength validation
  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordRequirements).every(Boolean);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    
    // Clear errors when user starts typing
    if (error) clearError();
    if (localError) setLocalError(null);
  };

  const handleRoleChange = (value: 'student' | 'parent' | 'teacher') => {
    setFormData(prev => ({
      ...prev,
      role: value,
      // Clear grade and studentId if not student
      grade: value === 'student' ? prev.grade : '',
      studentId: value === 'student' ? prev.studentId : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validation
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setLocalError('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }

    if (!isPasswordStrong) {
      setLocalError('Password must meet all requirements');
      return;
    }

    if (formData.password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.role === 'student' && (!formData.grade || !formData.studentId)) {
      setLocalError('Grade and Student ID are required for students');
      return;
    }

    try {
      await register(formData);
      // Registration successful, navigate to portal
      router.push('/portal');
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Registration failed:', err);
    }
  };

  const displayError = error || localError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Join the Regisbridge community
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {displayError && (
              <Alert variant="destructive">
                <AlertDescription>{displayError}</AlertDescription>
              </Alert>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@regisbridge.ac.zw"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">I am a *</Label>
              <Select 
                value={formData.role} 
                onValueChange={handleRoleChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Student Fields */}
            {formData.role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade *</Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, grade: value }))}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Form 1A">Form 1A</SelectItem>
                      <SelectItem value="Form 1B">Form 1B</SelectItem>
                      <SelectItem value="Form 2A">Form 2A</SelectItem>
                      <SelectItem value="Form 2B">Form 2B</SelectItem>
                      <SelectItem value="Form 3A">Form 3A</SelectItem>
                      <SelectItem value="Form 3B">Form 3B</SelectItem>
                      <SelectItem value="Form 4A">Form 4A</SelectItem>
                      <SelectItem value="Form 4B">Form 4B</SelectItem>
                      <SelectItem value="Lower 6">Lower 6</SelectItem>
                      <SelectItem value="Upper 6">Upper 6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    name="studentId"
                    type="text"
                    placeholder="STU2025001"
                    value={formData.studentId}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10 pr-10"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="text-xs space-y-1 mt-2">
                  <div className={`flex items-center gap-2 ${passwordRequirements.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordRequirements.minLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-2 ${passwordRequirements.hasUpperCase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordRequirements.hasUpperCase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    One uppercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passwordRequirements.hasLowerCase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordRequirements.hasLowerCase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    One lowercase letter
                  </div>
                  <div className={`flex items-center gap-2 ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordRequirements.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    One number
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 pr-10"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && formData.password !== confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !isPasswordStrong}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
