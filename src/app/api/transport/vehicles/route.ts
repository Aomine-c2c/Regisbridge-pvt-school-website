import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    
    // In a real app, use the verify function. For now/mock, we might skip strict checking if auth logic isn't fully wired for API yet
    // But let's try to do it right.
    const token = authHeader.split(' ')[1]
    const payload = await verifyAccessToken(token)
    
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        trips: {
          take: 1,
          orderBy: { date: 'desc' },
          include: {
            route: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, data: vehicles })
  } catch (error) {
    console.error('Error fetching vehicles:', error)
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
    const { registrationNumber, capacity, model, driverName, driverPhone } = body

    const vehicle = await prisma.vehicle.create({
      data: {
        registrationNumber,
        capacity: parseInt(capacity),
        model,
        driverName,
        driverPhone,
      }
    })

    return NextResponse.json({ success: true, data: vehicle })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json({ success: false, message: 'Failed to create vehicle' }, { status: 500 })
  }
}
