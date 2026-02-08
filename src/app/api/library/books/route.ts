import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    // Auth check optional for public catalog, but let's enforce for now
    // const authHeader = request.headers.get('authorization')
    // ...

    const books = await prisma.book.findMany({
      where: query ? {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
          { isbn: { contains: query } },
        ]
      } : undefined,
      orderBy: { title: 'asc' },
    })

    return NextResponse.json({ success: true, data: books })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    const payload = await verifyAccessToken(token!)
    
    if (!payload || (payload.role !== 'admin' && payload.role !== 'teacher')) { // Librarians?
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, author, isbn, category, publisher, publicationYear, copies, location } = body

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        category,
        publisher,
        publicationYear: parseInt(publicationYear),
        copies: parseInt(copies),
        available: parseInt(copies), // Initially all available
        location,
        status: 'AVAILABLE'
      }
    })

    return NextResponse.json({ success: true, data: book })
  } catch (error) {
    console.error('Error adding book:', error)
    return NextResponse.json({ success: false, message: 'Failed to add book' }, { status: 500 })
  }
}
