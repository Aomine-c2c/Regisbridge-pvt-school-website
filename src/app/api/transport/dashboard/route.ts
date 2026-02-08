import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        // Authenticate
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch Data in Parallel
        const [totalVehicles, _, activeTrips, maintenanceVehicles] = await Promise.all([
            (prisma as any).vehicle.count(),
            (prisma as any).vehicle.count({ where: { status: 'ACTIVE' } }),
            (prisma as any).trip.count({ where: { status: 'IN_PROGRESS' } }),
            (prisma as any).vehicle.count({ where: { status: 'MAINTENANCE' } })
        ]);

        // Mock Data for fields not in schema yet
        const fuelEfficiency = {
            current: 8.2,
            unit: 'mpg',
            trend: '+2%'
        };

        const serviceDueCount = 3; // Mocked

        const recentActivity = await (prisma as any).vehicle.findMany({
            take: 5,
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                registrationNumber: true,
                status: true,
                driverName: true,
                updatedAt: true
            }
        });

        const activity = recentActivity.map((v: any) => ({
            id: v.id,
            description: `Vehicle ${v.registrationNumber} is ${v.status}`,
            time: v.updatedAt.toISOString(),
            type: v.status === 'MAINTENANCE' ? 'alert' : 'info'
        }));

        // Fetch vehicles for fleet list separately
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { status: 'asc' }, // ACTIVE first
            take: 50 // Cap for performance if needed
        });

        // Transform Vehicles for UI
        const fleetList = vehicles.map(v => ({
            id: v.id,
            vehicleId: `#${v.registrationNumber}`,
            driver: {
                name: v.driverName || 'Unassigned',
                image: null // Add placeholder logic on frontend
            },
            route: 'Unassigned', // Need to join with Trip/Route to get current route. skipping for MVP speed
            status: v.status === 'ACTIVE' ? 'On Time' : v.status === 'MAINTENANCE' ? 'Maintenance' : 'Idle', // Simple mapping
            fuel: '85%', // Mocked
            odometer: '45,200 mi', // Mocked
            lastService: 'Oct 12, 2023' // Mocked
        }));

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    totalVehicles: { value: totalVehicles, subtext: `${maintenanceVehicles} in maintenance` },
                    activeRoutes: { value: activeTrips, subtext: 'Live' },
                    fuelEfficiency,
                    nextService: { value: serviceDueCount, subtext: 'Due < 7 days' }
                },
                fleet: fleetList
            }
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
