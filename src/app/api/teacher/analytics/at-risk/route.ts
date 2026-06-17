import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/analytics-service';
import { verifyAccessToken } from '@/lib/auth';

// GET /api/teacher/analytics/at-risk
export async function GET(request: NextRequest) {
  try {
    // 1. Verify User is Teacher
    const token = request.cookies.get('accessToken')?.value || request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    
    const user = await verifyAccessToken(token);
    if (!user || user.role !== 'TEACHER') {
        return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

        if (!tenantId) {
        return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    // 2. Fetch scoped analytics
    const atRiskStudents = await analyticsService.getAtRiskStudents({ teacherId: user.userId });

    return NextResponse.json({ 
        success: true, 
        data: atRiskStudents 
    });

  } catch (error) {
    console.error('Failed to fetch at-risk students:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
