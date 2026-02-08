'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function DebugPage() {
    const { user, loading } = useAuth()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="p-10 font-mono">
            <h1 className="text-2xl font-bold mb-4">Auth Debugger</h1>
            
            <div className="mb-6 p-4 border rounded bg-gray-50">
                <h2 className="font-bold mb-2">Auth State</h2>
                <div>Loading: {loading ? 'true' : 'false'}</div>
                <div>User: {user ? 'Present' : 'Null'}</div>
            </div>

            {user && (
                <div className="mb-6 p-4 border rounded bg-blue-50">
                    <h2 className="font-bold mb-2">User Object</h2>
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            )}

            {user && (
                <div className="mb-6 p-4 border rounded bg-green-50">
                    <h2 className="font-bold mb-2">Role Analysis</h2>
                    <div>Raw Role: "{user.role}"</div>
                    <div>Lowercase: "{user.role.toLowerCase()}"</div>
                    <div>Trimmed & Lowercase: "{user.role.toLowerCase().trim()}"</div>
                    <div>Length: {user.role.length}</div>
                    <div>Char Codes: {user.role.split('').map(c => c.charCodeAt(0)).join(', ')}</div>
                </div>
            )}
        </div>
    )
}
