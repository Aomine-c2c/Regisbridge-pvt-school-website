import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/admin/events - List events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    // const search = searchParams.get('search') || ''; // Could add search
    
    const skip = (page - 1) * limit;

    // Default: List upcoming events first
    const [events, total] = await prisma.$transaction([
      prisma.event.findMany({
        skip,
        take: limit,
        orderBy: { eventDate: 'asc' },
      }),
      prisma.event.count(),
    ]);

    const formattedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      eventDate: event.eventDate.toISOString(),
      endDate: event.endDate?.toISOString(),
      location: event.location || 'TBD',
      category: event.category,
      status: event.status,
      imageUrl: event.imageUrl,
      attendees: event.attendees,
      createdAt: event.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: formattedEvents, // api.ts expects Event[] mainly, or we should check if it handles pagination. 
      // adminService.ts getAllEvents expects Event[] directly in data. 
      // Let's check adminService.ts... it expects Event[].
      // But getAllUsers expected PaginatedResponse.
      // Let's stick to returning array for now as per likely usage in dashboard or update adminService if needed.
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/admin/events - Create event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      eventDate,
      endDate,
      location,
      category,
      imageUrl,
    } = body;

    if (!title || !eventDate || !category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description: description || '',
        eventDate: new Date(eventDate),
        endDate: endDate ? new Date(endDate) : null,
        location,
        category,
        imageUrl,
        status: 'UPCOMING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: event,
    });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create event' },
      { status: 500 }
    );
  }
}
