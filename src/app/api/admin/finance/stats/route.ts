import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const totalRevenueRef = await prisma.feePayment.aggregate({
      _sum: {
        paidAmount: true
      }
    });

    const pendingFeesRef = await prisma.feePayment.aggregate({
      _sum: {
        balance: true
      },
      where: {
        status: { not: 'PAID' }
      }
    });
    
    const overdueCount = await prisma.feePayment.count({
      where: {
        status: { not: 'PAID' },
        dueDate: { lt: new Date() }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: totalRevenueRef._sum.paidAmount || 0,
        pendingFees: pendingFeesRef._sum.balance || 0,
        overdueCount
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
