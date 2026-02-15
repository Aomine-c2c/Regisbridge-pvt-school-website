import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const totalRevenueRef = await db.feePayment.aggregate({
      _sum: {
        amountPaid: true
      },
      where: {
        student: {
            tenantId: tenantId
        }
      }
    });

    // Schema limitation: No Student Invoice model to track pending/overdue explicitly per student.
    // FeePayment is strictly a transaction log.
    // Future improvement: Implement StudentFee model.

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: totalRevenueRef._sum?.amountPaid || 0,
        pendingFees: 0, 
        overdueCount: 0
      }
    });

  } catch (error) {
    console.error('Error fetching finance stats:', error);
     return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
