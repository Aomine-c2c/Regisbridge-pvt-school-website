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

    const routes = await prisma.route.findMany({
      orderBy: { name: 'asc' },
      include: {
        trips: {
          where: {
            date: {
              gte: new Date() // Future trips
            }
          },
          take: 5
        }
      }
    })

    return NextResponse.json({ success: true, data: routes })
  } catch (error) {
    console.error('Error fetching routes:', error)
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
    const { name, startLocation, endLocation, stops, schedule, distance } = body

    const route = await prisma.route.create({
      data: {
        name,
        startLocation,
        endLocation,
        stops: JSON.stringify(stops), // Expecting array
        schedule,
        distance: parseFloat(distance),
      }
    })

    return NextResponse.json({ success: true, data: route })
  } catch (error) {
    console.error('Error creating route:', error)
    return NextResponse.json({ success: false, message: 'Failed to create route' }, { status: 500 })
  }
}
