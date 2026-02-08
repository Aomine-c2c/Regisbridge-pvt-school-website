import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Student Profile
        const student = await prisma.student.findUnique({
            where: { userId: user.userId },
            include: { hostelBed: { include: { room: { include: { block: true, beds: { include: { student: { include: { user: true } } } } } } } } }
        });

        if (!student) {
             return NextResponse.json({ success: false, message: 'Student profile not found' }, { status: 404 });
        }

        const studentAny = student as any;
        const bed = studentAny.hostelBed;

        if (!bed) {
            return NextResponse.json({
                success: true,
                data: {
                    assigned: false,
                    roomNumber: null,
                    blockName: null,
                    wardenName: null,
                    roommates: []
                }
            });
        }

        const room = bed.room;
        const block = room.block;
        
        // Filter roommates (exclude self)
        const roommates = room.beds
            .filter((bed: any) => bed.studentId && bed.studentId !== student.id)
            .map((bed: any) => ({
                name: `${bed.student?.user?.firstName} ${bed.student?.user?.lastName}`,
                grade: bed.student?.currentGrade,
                avatar: null // Placeholder
            }));

        return NextResponse.json({
            success: true,
            data: {
                assigned: true,
                room: {
                    number: room.roomNumber,
                    block: block.name, // e.g., West Wing
                    blockType: block.type, // e.g., Boys Hostel Block A
                    floor: room.floor,
                    location: `Near ${block.name} Stairwell` // Mock location description
                },
                roommates,
                status: 'In Dorm', // Mock status
                checkIn: 'Today at 4:30 PM', // Mock
                curfew: '9:00 PM' // Mock
            }
        });

    } catch (error) {
        console.error('Hostel Student API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
