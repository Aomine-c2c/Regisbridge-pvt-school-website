import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const payload = await verifyAccessToken(token!)
    
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { studentId, bedId } = body

    // Transaction to ensure atomicity
    const allocation = await prisma.$transaction(async (tx: any) => {
      // Check if bed is occupied
      const bed = await tx.hostelBed.findUnique({ where: { id: bedId } })
      if (!bed) throw new Error('Bed not found')
      if (bed.studentId) throw new Error('Bed already occupied')

      // Check if student already has a bed
      const student = await tx.student.findUnique({ 
        where: { id: studentId },
        include: { hostelBed: true }
      })
      if (!student) throw new Error('Student not found')
      if (student.hostelBed) throw new Error('Student already allocated a bed')

      // Allocate
      return await tx.hostelBed.update({
        where: { id: bedId },
        data: { studentId }
      })
    })

    return NextResponse.json({ success: true, data: allocation })
  } catch (error) {
    console.error('Error allocating bed:', error)
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
    try {
      const authHeader = request.headers.get('authorization')
      const token = authHeader?.split(' ')[1]
      const payload = await verifyAccessToken(token!)
      
      if (!payload || payload.role !== 'admin') {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
      }
  
      const { searchParams } = new URL(request.url)
      const bedId = searchParams.get('bedId')
  
      if (!bedId) {
          return NextResponse.json({ success: false, message: 'Bed ID required' }, { status: 400 })
      }
  
      await prisma.hostelBed.update({
          where: { id: bedId },
          data: { studentId: null }
      })
  
      return NextResponse.json({ success: true, message: 'Deallocated successfully' })
    } catch (error) {
      console.error('Error deallocating bed:', error)
      return NextResponse.json({ success: false, message: 'Failed to deallocate' }, { status: 500 })
    }
  }
