import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';
import { Prisma } from '@prisma/client';

// GET /api/admin/finance/payments
export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const status = searchParams.get('status'); // PAID, PENDING, PARTIAL
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: Prisma.FeePaymentWhereInput = {
        // Enforce tenant scoping via student relation since FeePayment lacks tenantId
        student: {
            tenantId: tenantId
        }
    };
    
    if (studentId) where.studentId = studentId;
    if (status) where.status = status;

    const [payments, total] = await db.$transaction([
      db.feePayment.findMany({
        where,
        include: {
          student: {
            include: {
              user: {
                select: { firstName: true, lastName: true, email: true }
              }
            }
          },
          feeStructure: true // Include this to get amount/dueDate
        } as any,
        skip,
        take: limit,
        orderBy: { paymentDate: 'desc' } // Changed from createdAt
      }),
      db.feePayment.count({ where })
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedPayments = payments.map((p: any) => ({
      id: p.id,
      studentName: p.student.user ? `${p.student.user.firstName} ${p.student.user.lastName}` : 'Unknown',
      studentId: p.student.admissionIdentifier || p.studentId, 
      amount: p.feeStructure?.amount || p.amountPaid, // Fallback
      paidAmount: p.amountPaid,
      balance: (p.feeStructure?.amount || p.amountPaid) - p.amountPaid,
      feeType: p.feeStructure?.name || 'General Payment',
      status: p.status,
      dueDate: p.feeStructure?.dueDate ? new Date(p.feeStructure.dueDate).toISOString() : new Date().toISOString(),
      paymentDate: p.paymentDate?.toISOString(),
      method: p.method, // Fixed: paymentMethod -> method (schema matches)
    }));

    return NextResponse.json({
      success: true,
      data: {
        data: formattedPayments,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/admin/finance/payments - Record a payment
export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
            return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const body = await request.json();
    const {
      studentId, // This should be the internal ID (uuid)
      amount, // We use this as amountPaid
      paymentMethod
      // notes - unused
    } = body;

    // ...

    const paid = parseFloat(amount);
    
    // Create simple payment record
    const payment = await db.feePayment.create({
      data: {
        studentId,
        amountPaid: paid,
        status: 'PAID', // Assuming direct payment
        paymentDate: new Date(),
        method: paymentMethod || 'CASH', // Fixed field name
        recordedBy: user?.userId,
        // transactionId: feeType, // Optional misuse of field to store type? Better to leave null.
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Payment recorded successfully',
      data: payment
    });

  } catch (error) {
    console.error('Error recording payment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record payment' },
      { status: 500 }
    );
  }
}
