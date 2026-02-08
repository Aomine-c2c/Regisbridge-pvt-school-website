import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const user = token ? await verifyAccessToken(token) : null;

    if (!user || user.role !== 'admin') {
         return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch Real Data
    const totalStudents = await prisma.student.count();
    const totalStaff = await prisma.staffProfile.count();
    
    // 2. Mock Financial & Historical Data (Simulating a complex query)
    const revenue = 12500000; // $12.5M
    const projectedRevenue = 11500000;
    const costs = 8200000;
    
    // Calculate simple health score parts
    const enrollmentScore = Math.min((totalStudents / 1000) * 100, 100); // Target 1000 students
    const retentionScore = 98; // Hardcoded for now
    const financialScore = Math.min((revenue / projectedRevenue) * 100, 100);
    
    const healthScore = Math.round((enrollmentScore * 0.3) + (retentionScore * 0.3) + (financialScore * 0.4));

    return NextResponse.json({
      success: true,
      data: {
        healthScore,
        enrollment: {
          total: totalStudents,
          trend: '+4%', // Mocked trend
        },
        revenue: {
          current: revenue,
          projected: projectedRevenue,
          trend: '+8%'
        },
        retention: {
          rate: retentionScore,
          departures: 2
        },
        trajectory: [
          { year: '2020', revenue: 9.8, academics: 3.5, costs: 7.2 },
          { year: '2021', revenue: 10.2, academics: 3.6, costs: 7.5 },
          { year: '2022', revenue: 11.5, academics: 3.8, costs: 7.9 },
          { year: '2023', revenue: 12.1, academics: 3.9, costs: 8.1 },
          { year: '2024', revenue: 12.5, academics: 4.0, costs: 8.2 },
        ]
      }
    });

  } catch (error) {
    console.error('Strategic Analytics API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch strategic data' }, { status: 500 });
  }
}
