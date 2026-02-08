import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const payload = await verifyAccessToken(token!)

    if (!payload) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    // Teachers see their own duties, Admins see all
    const where = (payload.role === 'teacher')
        ? { invigilator: { userId: payload.userId } }
        : {}

    const schedules = await prisma.examSchedule.findMany({
      where: {
        // Filter by invigilator if teacher
        invigilatorId: (payload.role === 'teacher') ? payload.userId : undefined
      },
      include: {
        subject: true,
        session: true, // Use session instead of examSession
      },
      orderBy: { date: 'asc' }
    })

    return NextResponse.json({ success: true, data: schedules })
  } catch (error) {
    console.error('Error fetching invigilation duties:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
    try {
      const authHeader = request.headers.get('authorization')
      const token = authHeader?.split(' ')[1]
      const payload = await verifyAccessToken(token!)
      
      if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
      }
  
      const body = await request.json()
      const { scheduleId, userId } = body // Use scheduleId and userId (invigilator)
  
      const schedule = await prisma.examSchedule.update({
        where: { id: scheduleId },
        data: {
            invigilatorId: userId
        }
      })
  
      return NextResponse.json({ success: true, data: schedule })
    } catch (error) {
      console.error('Error assigning invigilator:', error)
      return NextResponse.json({ success: false, message: 'Failed to assign invigilator' }, { status: 500 })
    }
}
