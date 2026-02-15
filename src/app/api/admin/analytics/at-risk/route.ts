import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/analytics-service';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/analytics/at-risk
export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
        return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const atRiskStudents = await analyticsService.getAtRiskStudents(tenantId);

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
