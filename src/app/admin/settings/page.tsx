'use client'

import React, { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useSettings } from '@/contexts/SettingsContext'

export default function SettingsPage() {
    const { toast } = useToast()
    const { refreshSettings } = useSettings()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    
    const [settings, setSettings] = useState({
        schoolName: "",
        schoolEmail: "",
        schoolPhone: "",
        schoolAddress: "",
        motto: "",
        establishmentYear: "",
        campusSize: "",
        locationSummary: "",
        facebookUrl: "",
        twitterUrl: "",
        instagramUrl: "",
        linkedinUrl: "",
        youtubeUrl: "",
        academicYear: "",
        currency: "USD",
        timezone: "Africa/Harare",
        notifications: {
            newStudent: true,
            staffLeave: true,
            systemUpdates: false
        }
    })

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/admin/settings')
                const data = await response.json()
                if (data.success) {
                    const s = data.settings
                    setSettings({
                        schoolName: s.schoolName || "",
                        schoolEmail: s.schoolEmail || "",
                        schoolPhone: s.schoolPhone || "",
                        schoolAddress: s.schoolAddress || "",
                        motto: s.motto || "",
                        establishmentYear: s.establishmentYear || "",
                        campusSize: s.campusSize || "",
                        locationSummary: s.locationSummary || "",
                        facebookUrl: s.facebookUrl || "",
                        twitterUrl: s.twitterUrl || "",
                        instagramUrl: s.instagramUrl || "",
                        linkedinUrl: s.linkedinUrl || "",
                        youtubeUrl: s.youtubeUrl || "",
                        academicYear: s.academicYear || "",
                        currency: s.currency || "USD",
                        timezone: s.timezone || "Africa/Harare",
                        notifications: {
                            newStudent: s.notifyOnNewRegistration ?? true,
                            staffLeave: s.enableEmailNotifications ?? true,
                            systemUpdates: s.enablePushNotifications ?? false
                        }
                    })
                }
            } catch (error) {
                console.error('Error fetching settings:', error)
            } finally {
                setFetching(false)
            }
        }
        fetchSettings()
    }, [])

    const handleSave = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    schoolName: settings.schoolName,
                    schoolEmail: settings.schoolEmail,
                    schoolPhone: settings.schoolPhone,
                    schoolAddress: settings.schoolAddress,
                    motto: settings.motto,
                    establishmentYear: settings.establishmentYear,
                    campusSize: settings.campusSize,
                    locationSummary: settings.locationSummary,
                    facebookUrl: settings.facebookUrl,
                    twitterUrl: settings.twitterUrl,
                    instagramUrl: settings.instagramUrl,
                    linkedinUrl: settings.linkedinUrl,
                    youtubeUrl: settings.youtubeUrl,
                    academicYear: settings.academicYear,
                    currency: settings.currency,
                    timezone: settings.timezone,
                    notifyOnNewRegistration: settings.notifications.newStudent,
                    enableEmailNotifications: settings.notifications.staffLeave,
                    enablePushNotifications: settings.notifications.systemUpdates
                })
            })
            
            const data = await response.json()
            if (data.success) {
                toast({ title: "Settings Saved", description: "Institutional configuration has been updated." })
                await refreshSettings()
            } else {
                toast({ title: "Error", description: data.message || "Failed to save settings", variant: "destructive" })
            }
        } catch (error) {
            toast({ title: "Error", description: "Network error while saving settings", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-gray-50/30">
             {/* Header */}
             <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-[1000px] mx-auto flex justify-between items-center w-full">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
                        <p className="text-sm text-gray-500">Institutional configuration and preferences</p>
                    </div>
                    <Button onClick={handleSave} disabled={loading} className="bg-brand-navy hover:bg-brand-navy/90">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-8 max-w-[1000px] mx-auto w-full space-y-8 pb-12">
                
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
                                    value={settings.schoolEmail}
                                    onChange={(e) => setSettings({...settings, schoolEmail: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</Label>
                                <input 
                                    type="text" 
                                    value={settings.schoolPhone}
                                    onChange={(e) => setSettings({...settings, schoolPhone: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</Label>
                                <input 
                                    type="text" 
                                    value={settings.academicYear}
                                    onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</Label>
                            <input 
                                type="text" 
                                value={settings.schoolAddress}
                                onChange={(e) => setSettings({...settings, schoolAddress: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                            />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Establishment Year</Label>
                                <input 
                                    type="text" 
                                    value={settings.establishmentYear}
                                    onChange={(e) => setSettings({...settings, establishmentYear: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Campus Size</Label>
                                <input 
                                    type="text" 
                                    value={settings.campusSize}
                                    onChange={(e) => setSettings({...settings, campusSize: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Location Summary</Label>
                            <input 
                                type="text" 
                                value={settings.locationSummary}
                                onChange={(e) => setSettings({...settings, locationSummary: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                placeholder="e.g. Located in the heart of Harare, Zimbabwe"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Social Media</h3>
                        <p className="text-xs text-gray-500">Manage links to official social profiles</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.facebookUrl}
                                    onChange={(e) => setSettings({...settings, facebookUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.instagramUrl}
                                    onChange={(e) => setSettings({...settings, instagramUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.twitterUrl}
                                    onChange={(e) => setSettings({...settings, twitterUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.linkedinUrl}
                                    onChange={(e) => setSettings({...settings, linkedinUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Notifications & Alerts</h3>
                        <p className="text-xs text-gray-500">Configure institutional notification defaults</p>
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
                                <h4 className="text-sm font-bold text-gray-900">Staff Communications</h4>
                                <p className="text-xs text-gray-500">Enable default email notifications for staff</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.staffLeave}
                                onCheckedChange={(c) => setSettings({...settings, notifications: {...settings.notifications, staffLeave: c}})}
                            />
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">System Maintenance</h4>
                                <p className="text-xs text-gray-500">Show maintenance alerts on the dashboards</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.systemUpdates}
                                onCheckedChange={(c) => setSettings({...settings, notifications: {...settings.notifications, systemUpdates: c}})}
                            />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

