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

    const rooms = await prisma.hostelRoom.findMany({
      include: {
        block: true,
        beds: {
          include: {
            student: {
              select: {
                rollNumber: true,
                user: { select: { firstName: true, lastName: true } }
              }
            }
          }
        }
      },
      orderBy: [{ block: { name: 'asc' } }, { roomNumber: 'asc' }]
    })

    return NextResponse.json({ success: true, data: rooms })
  } catch (error) {
    console.error('Error fetching hostel rooms:', error)
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
    const { blockId, roomNumber, capacity, floor } = body

    const room = await prisma.hostelRoom.create({
      data: {
        blockId,
        roomNumber,
        capacity: parseInt(capacity),
        floor: parseInt(floor),
        // Create beds automatically based on capacity
        beds: {
          create: Array.from({ length: parseInt(capacity) }, (_, i) => ({
            bedNumber: `${roomNumber}-${String.fromCharCode(65 + i)}` // 101-A, 101-B...
          }))
        }
      },
      include: { beds: true }
    })

    return NextResponse.json({ success: true, data: room })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ success: false, message: 'Failed to create room' }, { status: 500 })
  }
}
