import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireAdmin(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Fetch Metrics in Parallel
        const [totalBooks, issuedBooks, overdueBooks, recentTransactions, inventory] = await Promise.all([
            prisma.book.count(),
            prisma.libraryIssue.count({ where: { status: 'ISSUED' } }),
            prisma.libraryIssue.count({ where: { status: 'OVERDUE' } }),
            prisma.libraryIssue.findMany({
                take: 5,
                orderBy: { updatedAt: 'desc' },
                include: {
                    book: { select: { title: true } },
                    student: { select: { user: { select: { firstName: true, lastName: true } }, currentGrade: true } }
                }
            }),
            prisma.book.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    issues: {
                        where: { status: { in: ['ISSUED', 'OVERDUE'] } },
                        include: {
                            student: { select: { user: { select: { firstName: true, lastName: true } } } }
                        }
                    }
                }
            })
        ]);

        // Transform Transactions
        const transactions = recentTransactions.map(t => ({
            id: t.id,
            bookTitle: t.book.title,
            studentName: `${t.student.user.firstName} ${t.student.user.lastName}`.trim() || 'Student',
            grade: t.student.currentGrade,
            type: t.status === 'ISSUED' ? 'Issued to' : t.status === 'RETURNED' ? 'Returned by' : 'Updated',
            time: new Date(t.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Simplified time
        }));

        // Transform Inventory
        const inventoryList = inventory.map(book => {
            const currentIssue = book.issues[0];
            return {
                id: book.id,
                title: book.title,
                isbn: book.isbn || 'N/A',
                category: book.category || 'General',
                status: currentIssue ? (currentIssue.status === 'OVERDUE' ? 'Overdue' : 'Borrowed') : 'Available',
                borrower: currentIssue ? `${currentIssue.student.user.firstName} ${currentIssue.student.user.lastName}` : null,
                dueDate: currentIssue?.dueDate ? new Date(currentIssue.dueDate).toLocaleDateString() : null,
                coverImage: null // Placeholder on frontend
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                metrics: {
                    totalVolumes: totalBooks,
                    activeCirculation: issuedBooks,
                    overdueItems: overdueBooks,
                    digitalAccess: 1205 // Mocked for now
                },
                recentTransactions: transactions,
                inventory: inventoryList
            }
        });

    } catch (error) {
        console.error('Library Admin API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
