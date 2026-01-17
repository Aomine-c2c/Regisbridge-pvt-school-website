import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

async function verifyStudentAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { authorized: false, error: 'No token provided' }
    }

    const token = authHeader.substring(7)
    const payload = await verifyAccessToken(token)

    if (!payload) {
        return { authorized: false, error: 'Invalid token' }
    }

    return { authorized: true, userId: payload.userId, role: payload.role }
}

// GET /api/student/attendance - Get student attendance records
export async function GET(request: NextRequest) {
    try {
        const auth = await verifyStudentAccess(request)
        if (!auth.authorized) {
            return NextResponse.json(
                { success: false, message: auth.error },
                { status: 401 }
            )
        }

        const { searchParams } = new URL(request.url)
        const studentId = searchParams.get('studentId') || auth.userId
        const month = searchParams.get('month') // Optional: filter by month (YYYY-MM)

        // Only allow students to view their own attendance
        if (auth.role === 'student' && studentId !== auth.userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 403 }
            )
        }

        // Build date filter
        const where: any = { studentId }
        if (month) {
            const startDate = new Date(`${month}-01`)
            const endDate = new Date(startDate)
            endDate.setMonth(endDate.getMonth() + 1)

            where.date = {
                gte: startDate,
                lt: endDate,
            }
        }

        const attendance = await prisma.attendance.findMany({
            where,
            include: {
                subject: {
                    select: { name: true, code: true }
                }
            },
            orderBy: { date: 'desc' },
        })

        // Calculate statistics
        const total = attendance.length
        const present = attendance.filter(a => a.status === 'present').length
        const absent = attendance.filter(a => a.status === 'absent').length
        const late = attendance.filter(a => a.status === 'late').length
        const excused = attendance.filter(a => a.status === 'excused').length

        return NextResponse.json({
            success: true,
            attendance,
            statistics: {
                total,
                present,
                absent,
                late,
                excused,
                rate: total > 0 ? ((present + late) / total * 100).toFixed(1) : '0',
            },
        })
    } catch (error) {
        console.error('Get attendance error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
