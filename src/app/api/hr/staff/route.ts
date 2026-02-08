import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const payload = await verifyAccessToken(token!)

    if (!payload || (payload.role !== 'admin' && payload.role !== 'teacher')) { 
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')

    const staff = await prisma.staffProfile.findMany({
      where: department ? { department } : undefined,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          }
        }
      },
      orderBy: { user: { lastName: 'asc' } }
    })

    return NextResponse.json({ success: true, data: staff })
  } catch (error) {
    console.error('Error fetching staff:', error)
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

    // Creating a staff member usually involves creating a User account first or linking to an existing one
    // For simplicity, we assume the User account exists and we are creating the Profile
    const body = await request.json()
    const { userId, designation, department, joinDate, basicSalary, contractType } = body

    const profile = await prisma.staffProfile.create({
      data: {
        userId,
        employeeId: `EMP-${Date.now()}`,
        designation,
        department,
        joinDate: new Date(joinDate),
        basicSalary: parseFloat(basicSalary),
        contractType
      }
    })

    return NextResponse.json({ success: true, data: profile })
  } catch (error) {
    console.error('Error creating staff profile:', error)
    return NextResponse.json({ success: false, message: 'Failed to create staff profile' }, { status: 500 })
  }
}
