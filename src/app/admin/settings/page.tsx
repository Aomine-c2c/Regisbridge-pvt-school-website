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
        },
        features: {
            enableFinance: true,
            enableHostel: false,
            enableTransport: false,
            enableLibrary: false,
            enableHR: true,
            enableEvents: true,
        },
        theme: {
            primaryColor: "#0f172a",
            secondaryColor: "#3b82f6"
        },
        academics: {
            gradingScale: "Standard Percentage",
            attendanceTrackBy: "DAILY",
            attendanceMinPercentage: 75,
            lateGracePeriodMinutes: 15
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
                        },
                        features: {
                            enableFinance: s.enableFinance ?? true,
                            enableHostel: s.enableHostel ?? false,
                            enableTransport: s.enableTransport ?? false,
                            enableLibrary: s.enableLibrary ?? false,
                            enableHR: s.enableHR ?? true,
                            enableEvents: s.enableEvents ?? true,
                        },
                        theme: {
                            primaryColor: s.primaryColor || "#0f172a",
                            secondaryColor: s.secondaryColor || "#3b82f6"
                        },
                        academics: {
                            gradingScale: s.gradingScale || "Standard Percentage",
                            attendanceTrackBy: s.attendanceTrackBy || "DAILY",
                            attendanceMinPercentage: s.attendanceMinPercentage || 75,
                            lateGracePeriodMinutes: s.lateGracePeriodMinutes || 15
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
                    enablePushNotifications: settings.notifications.systemUpdates,
                    features: settings.features,
                    theme: settings.theme,
                    academics: settings.academics
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
                                    onChange={(e: any) => setSettings({...settings, schoolName: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Official Email</Label>
                                <input 
                                    type="email" 
                                    value={settings.schoolEmail}
                                    onChange={(e: any) => setSettings({...settings, schoolEmail: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</Label>
                                <input 
                                    type="text" 
                                    value={settings.schoolPhone}
                                    onChange={(e: any) => setSettings({...settings, schoolPhone: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</Label>
                                <input 
                                    type="text" 
                                    value={settings.academicYear}
                                    onChange={(e: any) => setSettings({...settings, academicYear: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</Label>
                            <input 
                                type="text" 
                                value={settings.schoolAddress}
                                onChange={(e: any) => setSettings({...settings, schoolAddress: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Motto</Label>
                            <input 
                                type="text" 
                                value={settings.motto}
                                onChange={(e: any) => setSettings({...settings, motto: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Establishment Year</Label>
                                <input 
                                    type="text" 
                                    value={settings.establishmentYear}
                                    onChange={(e: any) => setSettings({...settings, establishmentYear: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Campus Size</Label>
                                <input 
                                    type="text" 
                                    value={settings.campusSize}
                                    onChange={(e: any) => setSettings({...settings, campusSize: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Location Summary</Label>
                            <input 
                                type="text" 
                                value={settings.locationSummary}
                                onChange={(e: any) => setSettings({...settings, locationSummary: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                placeholder="e.g. Located in the heart of Harare, Zimbabwe"
                            />
                        </div>
                    </div>
                </div>

                {/* Theme & Branding */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Theme & Branding</h3>
                        <p className="text-xs text-gray-500">Customize the look and feel of your school portal</p>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</Label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="color" 
                                        value={settings.theme.primaryColor}
                                        onChange={(e: any) => setSettings({...settings, theme: {...settings.theme, primaryColor: e.target.value}})}
                                        className="h-10 w-14 rounded border border-gray-300 cursor-pointer" 
                                    />
                                    <span className="text-sm font-mono text-gray-500">{settings.theme.primaryColor}</span>
                                </div>
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</Label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="color" 
                                        value={settings.theme.secondaryColor}
                                        onChange={(e: any) => setSettings({...settings, theme: {...settings.theme, secondaryColor: e.target.value}})}
                                        className="h-10 w-14 rounded border border-gray-300 cursor-pointer" 
                                    />
                                    <span className="text-sm font-mono text-gray-500">{settings.theme.secondaryColor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Modules / Feature Flags */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden border-l-4 border-l-brand-primary">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Active Modules</h3>
                        <p className="text-xs text-gray-500">Enable or disable specific features for your school. Disabled features will be completely hidden from all users.</p>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Finance & Fee Management</h4>
                                <p className="text-xs text-gray-500">Invoicing, payments, and financial reporting</p>
                            </div>
                            <Switch 
                                checked={settings.features.enableFinance}
                                onCheckedChange={(c: any) => setSettings({...settings, features: {...settings.features, enableFinance: c}})}
                            />
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Hostel & Boarding</h4>
                                <p className="text-xs text-gray-500">Room allocation and boarding management</p>
                            </div>
                            <Switch 
                                checked={settings.features.enableHostel}
                                onCheckedChange={(c: any) => setSettings({...settings, features: {...settings.features, enableHostel: c}})}
                            />
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Transport System</h4>
                                <p className="text-xs text-gray-500">Routes, vehicles, and bus tracking</p>
                            </div>
                            <Switch 
                                checked={settings.features.enableTransport}
                                onCheckedChange={(c: any) => setSettings({...settings, features: {...settings.features, enableTransport: c}})}
                            />
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Digital Library</h4>
                                <p className="text-xs text-gray-500">Book inventory and issuing system</p>
                            </div>
                            <Switch 
                                checked={settings.features.enableLibrary}
                                onCheckedChange={(c: any) => setSettings({...settings, features: {...settings.features, enableLibrary: c}})}
                            />
                        </div>
                    </div>
                </div>

                {/* Academic Configuration */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-900">Academic & Attendance Rules</h3>
                            <p className="text-xs text-gray-500">Configure grading logic and attendance tracking</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Active Grading Scale</Label>
                                <select 
                                    value={settings.academics.gradingScale}
                                    onChange={(e: any) => setSettings({...settings, academics: {...settings.academics, gradingScale: e.target.value}})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                                >
                                    <option value="Standard Percentage">Standard Percentage (0-100%)</option>
                                    <option value="GPA 4.0">GPA 4.0</option>
                                    <option value="Cambridge IGCSE">Cambridge IGCSE (A*-G)</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">This scale is applied universally when teachers input marks.</p>
                            </div>
                            
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Attendance Tracking Mode</Label>
                                <select 
                                    value={settings.academics.attendanceTrackBy}
                                    onChange={(e: any) => setSettings({...settings, academics: {...settings.academics, attendanceTrackBy: e.target.value}})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                                >
                                    <option value="DAILY">Daily (Once per day)</option>
                                    <option value="SUBJECT">Per Subject/Period</option>
                                </select>
                            </div>

                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Minimum Attendance %</Label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number" 
                                        min="0" max="100"
                                        value={settings.academics.attendanceMinPercentage}
                                        onChange={(e: any) => setSettings({...settings, academics: {...settings.academics, attendanceMinPercentage: parseInt(e.target.value)}})}
                                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                    />
                                    <span className="text-sm text-gray-500">%</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Students below this trigger an At-Risk alert.</p>
                            </div>

                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Late Grace Period</Label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={settings.academics.lateGracePeriodMinutes}
                                        onChange={(e: any) => setSettings({...settings, academics: {...settings.academics, lateGracePeriodMinutes: parseInt(e.target.value)}})}
                                        className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                    />
                                    <span className="text-sm text-gray-500">minutes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Roles & Permissions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-900">Custom Roles & Permissions</h3>
                            <p className="text-xs text-gray-500">Define what specific staff members can access</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">Manage Roles</Button>
                    </div>
                    <div className="p-6">
                        <div className="text-sm text-gray-600 mb-4">
                            By default, the system has <strong>Admin</strong>, <strong>Teacher</strong>, <strong>Student</strong>, and <strong>Parent</strong> roles. You can create custom groups (e.g., "Senior Accountant") and assign specific granular permissions.
                        </div>
                        <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3">Role Name</th>
                                        <th className="px-6 py-3">Users Assigned</th>
                                        <th className="px-6 py-3">Key Permissions</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b border-gray-100">
                                        <td className="px-6 py-4 font-medium text-gray-900">Accountant</td>
                                        <td className="px-6 py-4">3</td>
                                        <td className="px-6 py-4">View Finance, Edit Payments</td>
                                        <td className="px-6 py-4 text-right"><span className="text-brand-primary cursor-pointer hover:underline">Edit</span></td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-6 py-4 font-medium text-gray-900">Librarian</td>
                                        <td className="px-6 py-4">2</td>
                                        <td className="px-6 py-4">Manage Books, Issue Assets</td>
                                        <td className="px-6 py-4 text-right"><span className="text-brand-primary cursor-pointer hover:underline">Edit</span></td>
                                    </tr>
                                </tbody>
                            </table>
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
                                    onChange={(e: any) => setSettings({...settings, facebookUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.instagramUrl}
                                    onChange={(e: any) => setSettings({...settings, instagramUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.twitterUrl}
                                    onChange={(e: any) => setSettings({...settings, twitterUrl: e.target.value})}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy" 
                                />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</Label>
                                <input 
                                    type="url" 
                                    value={settings.linkedinUrl}
                                    onChange={(e: any) => setSettings({...settings, linkedinUrl: e.target.value})}
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
                                onCheckedChange={(c: any) => setSettings({...settings, notifications: {...settings.notifications, newStudent: c}})}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Staff Communications</h4>
                                <p className="text-xs text-gray-500">Enable default email notifications for staff</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.staffLeave}
                                onCheckedChange={(c: any) => setSettings({...settings, notifications: {...settings.notifications, staffLeave: c}})}
                            />
                        </div>
                         <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">System Maintenance</h4>
                                <p className="text-xs text-gray-500">Show maintenance alerts on the dashboards</p>
                            </div>
                            <Switch 
                                checked={settings.notifications.systemUpdates}
                                onCheckedChange={(c: any) => setSettings({...settings, notifications: {...settings.notifications, systemUpdates: c}})}
                            />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

