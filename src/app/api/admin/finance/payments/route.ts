import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/admin/finance/payments
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get('studentId');
    const status = searchParams.get('status'); // PAID, PENDING, PARTIAL
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (status) where.status = status;

    const [payments, total] = await prisma.$transaction([
      prisma.feePayment.findMany({
        where,
        include: {
          student: {
            include: {
              user: {
                select: { firstName: true, lastName: true, email: true }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.feePayment.count({ where })
    ]);

    const formattedPayments = payments.map(p => ({
      id: p.id,
      studentName: p.student.user ? `${p.student.user.firstName} ${p.student.user.lastName}` : 'Unknown',
      studentId: p.student.rollNumber || p.student.userId, // Display ID
      amount: p.amount,
      paidAmount: p.paidAmount,
      balance: p.balance,
      feeType: p.feeType,
      status: p.status,
      dueDate: p.dueDate.toISOString(),
      paymentDate: p.paymentDate?.toISOString(),
      method: p.paymentMethod,
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
    const body = await request.json();
    const {
      studentId, // This should be the internal ID (uuid)
      amount,
      feeType,
      dueDate,
      term,
      academicYear,
      paidAmount = 0,
      paymentMethod,
      notes
    } = body;

    if (!studentId || !amount || !feeType || !dueDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const totalAmount = parseFloat(amount);
    const paid = parseFloat(paidAmount);
    const balance = totalAmount - paid;
    
    let status = 'PENDING';
    if (balance <= 0) status = 'PAID';
    else if (paid > 0) status = 'PARTIAL';

    const payment = await prisma.feePayment.create({
      data: {
        studentId,
        amount: totalAmount, // Total fee due
        feeType,
        term: term || 'Term 1',
        academicYear: academicYear || new Date().getFullYear().toString(),
        dueDate: new Date(dueDate),
        paidAmount: paid,
        balance: balance,
        status,
        paymentDate: paid > 0 ? new Date() : null,
        paymentMethod: paid > 0 ? paymentMethod : null,
        notes,
        recordedBy: 'Admin' // Should come from session in real app
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
