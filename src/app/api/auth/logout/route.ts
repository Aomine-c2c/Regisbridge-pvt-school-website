import { NextResponse } from 'next/server'

export async function POST() {
    // Logout is primarily handled on the client side by clearing tokens from localStorage
    // This endpoint exists for consistency and can be extended for server-side session management

    return NextResponse.json({
        success: true,
        message: 'Logged out successfully',
    })
}
