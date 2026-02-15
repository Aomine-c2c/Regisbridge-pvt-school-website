import { NextRequest, NextResponse } from 'next/server'
import { getTenantDb } from '@/lib/db'
import { hashPassword } from '@/lib/password'
import { requireAdmin } from '@/lib/api/auth-middleware';

// POST /api/admin/users/create - Create new user
export async function POST(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const tenantId = request.headers.get('x-tenant-id');
        if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = getTenantDb(tenantId);

        const body = await request.json()
        const { email, password, firstName, lastName, role, phoneNumber } = body

        // Validate required fields
        if (!email || !password || !firstName || !lastName || !role) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if email already exists
        const existingUser = await db.user.findFirst({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'Email already registered' },
                { status: 409 }
            )
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create user
        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role,
                phoneNumber: phoneNumber || null,
                status: 'ACTIVE',
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                phoneNumber: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'User created successfully',
            user,
        }, { status: 201 })
    } catch (error) {
        console.error('Create user error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
