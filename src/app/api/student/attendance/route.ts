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
        // Resolve Student ID from User ID if we are a student, or if we are admin looking up a user
        // But for 'student' role, we must find their Student record.
        let targetStudentId = studentId;

        // If the caller is a student, we ignore the param (or verify it) and look up their own student record
        if (auth.role === 'student') {
            const studentRecord = await prisma.student.findUnique({
                where: { userId: auth.userId }
            })
            if (!studentRecord) {
                return NextResponse.json({ success: false, message: 'Student profile not found' }, { status: 404 })
            }
            targetStudentId = studentRecord.id
        } 
        
        // Build date filter
        const where: any = { studentId: targetStudentId }
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
            orderBy: { date: 'desc' },
        })

        // Calculate statistics
        const total = attendance.length
        const present = attendance.filter(a => a.status === 'PRESENT').length
        const absent = attendance.filter(a => a.status === 'ABSENT').length
        const late = attendance.filter(a => a.status === 'LATE').length
        const excused = attendance.filter(a => a.status === 'EXCUSED').length

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
