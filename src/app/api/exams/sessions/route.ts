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

    const sessions = await prisma.examSession.findMany({
      orderBy: { startDate: 'desc' },
      include: {
        _count: {
            select: { schedules: true }
        }
      }
    })

    return NextResponse.json({ success: true, data: sessions })
  } catch (error) {
    console.error('Error fetching exam sessions:', error)
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
    const { name, academicYear, term, startDate, endDate } = body

    const session = await prisma.examSession.create({
      data: {
        name,
        academicYear,
        term,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'UPCOMING'
      }
    })

    return NextResponse.json({ success: true, data: session })
  } catch (error) {
    console.error('Error creating exam session:', error)
    return NextResponse.json({ success: false, message: 'Failed to create session' }, { status: 500 })
  }
}
