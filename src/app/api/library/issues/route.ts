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

    // Admins/Teachers fetch all, Students fetch their own
    const where = (payload.role === 'student') 
      ? { student: { userId: payload.userId } }
      : {}

    const issues = await prisma.libraryIssue.findMany({
      where,
      include: {
        book: true,
        student: {
          select: {
            rollNumber: true,
            user: {
              select: { firstName: true, lastName: true }
            }
          }
        }
      },
      orderBy: { issueDate: 'desc' }
    })

    return NextResponse.json({ success: true, data: issues })
  } catch (error) {
    console.error('Error fetching library issues:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const payload = await verifyAccessToken(token!)
    
    if (!payload || (payload.role !== 'admin' && payload.role !== 'teacher')) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { bookId, studentRollNumber, dueDate } = body

    // Find student by roll number
    const student = await prisma.student.findUnique({
      where: { rollNumber: studentRollNumber }
    })

    if (!student) {
      return NextResponse.json({ success: false, message: 'Student not found' }, { status: 404 })
    }

    // Check book availability
    const book = await prisma.book.findUnique({ where: { id: bookId } })
    if (!book || book.available < 1) {
      return NextResponse.json({ success: false, message: 'Book not available' }, { status: 400 })
    }

    // Create issue and update book availability transaction
    const [issue, updatedBook] = await prisma.$transaction([
      prisma.libraryIssue.create({
        data: {
          bookId,
          studentId: student.id,
          dueDate: new Date(dueDate),
          status: 'ISSUED'
        }
      }),
      prisma.book.update({
        where: { id: bookId },
        data: { available: { decrement: 1 } }
      })
    ])

    return NextResponse.json({ success: true, data: issue })
  } catch (error) {
    console.error('Error issuing book:', error)
    return NextResponse.json({ success: false, message: 'Failed to issue book' }, { status: 500 })
  }
}
