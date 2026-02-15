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

    // Admins see all, Staff see their own
    // const where = (payload.role !== 'admin')
    //     ? { staffId: { user: { id: payload.userId } } }
    //     : {}
        
    // Let's optimize: fetch staffProfileId for the current user if not admin
    let staffProfileId = undefined;
    if (payload.role !== 'admin') {
        const profile = await prisma.staffProfile.findUnique({
            where: { userId: payload.userId }
        })
        if (!profile) {
            return NextResponse.json({ success: false, message: 'Staff profile not found' }, { status: 404 })
        }
        staffProfileId = profile.id
    }

    const leaves = await prisma.leave.findMany({
      where: staffProfileId ? { staffId: staffProfileId } : {},
      include: {
        staff: {
          include: {
            user: { select: { firstName: true, lastName: true } }
          }
        }
      },
      orderBy: { startDate: 'desc' }
    })

    return NextResponse.json({ success: true, data: leaves })
  } catch (error) {
    console.error('Error fetching leave requests:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const payload = await verifyAccessToken(token!)
    
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.staffProfile.findUnique({
        where: { userId: payload.userId }
    })
    if (!profile) {
        return NextResponse.json({ success: false, message: 'Staff profile required' }, { status: 403 })
    }

    const body = await request.json()
    const { type, startDate, endDate, reason } = body

    const leave = await prisma.leave.create({
      data: {
        staffId: profile.id,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ success: true, data: leave })
  } catch (error) {
    console.error('Error applying for leave:', error)
    return NextResponse.json({ success: false, message: 'Failed to apply for leave' }, { status: 500 })
  }
}
