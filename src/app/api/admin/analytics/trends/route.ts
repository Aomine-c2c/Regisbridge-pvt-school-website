import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/services/analytics-service';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/analytics/trends
export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

        if (!tenantId) {
        return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const trends = await analyticsService.getAcademicTrends(tenantId);

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
