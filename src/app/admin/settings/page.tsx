'use client'

import React, { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    
    // Mock State for Settings - defaults
    const [settings, setSettings] = useState({
        schoolName: "Regisbridge Academy",
        email: "admin@regisbridge.edu",
        motto: "Excellence in Education Since 1974",
        notifications: {
            newStudent: true,
            staffLeave: true,
            systemUpdates: false,
            weeklyReport: true
        },
        theme: "System"
    })

    const handleSave = async () => {
        setLoading(true)
        // Simulate API call
        await new Promise(r => setTimeout(r, 800))
        setLoading(false)
        toast({ title: "Settings Saved", description: "System configuration has been updated." })
    }

    return (
        <div className="flex flex-col h-full">
             {/* Header */}
             <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                    <p className="text-sm text-gray-500">Manage application configuration and preferences</p>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-8 max-w-[1000px] mx-auto w-full space-y-8">
                
                {/* School Information */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">School Information</h3>
                        <p className="text-xs text-gray-500">General details about the institution</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">School Name</Label>
                                <input 
                                    type="text" 
                                    value={settings.schoolName}
                                    onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Official Email</Label>
                                <input 
                                    type="email" 
                                    value={settings.email}
                                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Motto</Label>
                            <input 
                                type="text" 
                                value={settings.motto}
                                onChange={(e) => setSettings({...settings, motto: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Notifications & Alerts</h3>
                        <p className="text-xs text-gray-500">Configure how and when you want to be notified</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">New Student Registration</h4>
                                <p className="text-xs text-gray-500">Receive an email when a new student applies online</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.newStudent}
                                onCheckedChange={(c) => setSettings({...settings, notifications: {...settings.notifications, newStudent: c}})}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Staff Leave Requests</h4>
                                <p className="text-xs text-gray-500">Notify me when staff members request leave</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.staffLeave}
                                onCheckedChange={(c) => setSettings({...settings, notifications: {...settings.notifications, staffLeave: c}})}
                            />
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">System Updates</h4>
                                <p className="text-xs text-gray-500">Receive notifications about system maintenance</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.systemUpdates}
                                onCheckedChange={(c) => setSettings({...settings, notifications: {...settings.notifications, systemUpdates: c}})}
                            />
                        </div>
                    </div>
                </div>

                {/* Theme & Display */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Theme & Display</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex gap-4">
                            {['Light', 'Dark', 'System'].map(theme => (
                                <button 
                                    key={theme} 
                                    onClick={() => setSettings({...settings, theme})}
                                    className={`flex-1 py-3 border rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                                        settings.theme === theme 
                                        ? 'border-brand-navy bg-blue-50 text-brand-navy ring-1 ring-brand-navy' 
                                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}>
                                    <span className="material-symbols-outlined text-[18px]">
                                        {theme === 'Light' ? 'light_mode' : theme === 'Dark' ? 'dark_mode' : 'computer'}
                                    </span>
                                    {theme}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
