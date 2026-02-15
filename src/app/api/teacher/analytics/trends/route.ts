import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/analytics-service';
import { verifyAccessToken } from '@/lib/auth';

// GET /api/teacher/analytics/trends
export async function GET(request: NextRequest) {
  try {
    // 1. Verify User is Teacher
    const token = request.cookies.get('accessToken')?.value || request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    
    const user = await verifyAccessToken(token);
    if (!user || user.role !== 'TEACHER') {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
        return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    // 2. Fetch scoped trends
    const trends = await analyticsService.getAcademicTrends(tenantId, { teacherId: user.userId });

    return NextResponse.json({ 
        success: true, 
        data: trends 
    });

  } catch (error) {
    console.error('Failed to fetch trends:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
