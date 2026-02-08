import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch Data in Parallel
        const [totalRooms, totalBeds, occupiedBeds, blocks] = await Promise.all([
            prisma.hostelRoom.count(),
            prisma.hostelBed.count(),
            prisma.hostelBed.count({ where: { status: 'OCCUPIED' } }),
            prisma.hostelBlock.findMany({
                include: {
                    rooms: {
                        include: {
                            beds: {
                                include: {
                                    student: { select: { user: { select: { firstName: true, lastName: true, email: true } } } }
                                }
                            }
                        }
                    }
                }
            })
        ]);

        // Transform Data for Dashboard
        const totalCapacity = totalBeds; // Assuming 1 bed = 1 capacity unit roughly
        const occupancyRate = totalCapacity > 0 ? (occupiedBeds / totalCapacity) * 100 : 0;

        // Flatten rooms for the grid view
        const allRooms = blocks.flatMap((block: any) => 
            block.rooms.map((room: any) => ({
                id: room.id,
                number: room.roomNumber,
                blockName: block.name,
                floor: room.floor,
                capacity: room.capacity,
                occupied: room.beds.filter((b: any) => b.status === 'OCCUPIED').length,
                status: room.beds.length === 0 ? 'Maintenance' : (room.beds.some((b: any) => b.status === 'OCCUPIED') ? (room.beds.filter((b: any) => b.status === 'OCCUPIED').length === room.capacity ? 'Full' : 'Partial') : 'Available'),
                students: room.beds.filter((b: any) => b.student).map((b: any) => ({
                    name: `${b.student?.user.firstName} ${b.student?.user.lastName}`,
                    avatar: null // Placeholder
                }))
            }))
        );

        return NextResponse.json({
            success: true,
            data: {
                metrics: {
                    totalCapacity,
                    currentResidents: occupiedBeds,
                    occupancyRate: parseFloat(occupancyRate.toFixed(1)),
                    maintenanceRequests: 3 // Mocked as no schema exists
                },
                rooms: allRooms,
                maintenanceList: [ // Mocked
                    { id: '1', room: '104', issue: 'Broken AC', reportedBy: 'Warden', date: '2024-02-01', status: 'In Progress' },
                    { id: '2', room: '205', issue: 'Leaking Faucet', reportedBy: 'Student', date: '2024-02-02', status: 'Pending' }
                ]
            }
        });

    } catch (error) {
        console.error('Hostel Admin API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
