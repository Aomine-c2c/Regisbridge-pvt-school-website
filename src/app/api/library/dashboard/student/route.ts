import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireStudent } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireStudent(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        // Get Student Profile
        const student = await prisma.student.findUnique({
            where: { userId: user.userId }
        });

        if (!student) return NextResponse.json({ success: false, message: 'Student profile not found' }, { status: 404 });

        // Fetch Data in Parallel
        const [borrowedBooks, overdueBooks, totalBooks] = await Promise.all([
            (prisma as any).libraryIssue.count({ where: { studentId: student.id, status: 'ISSUED' } }),
            (prisma as any).libraryIssue.count({
                where: {
                    studentId: student.id,
                    status: 'ISSUED',
                    dueDate: { lt: new Date() }
                }
            }),
            (prisma as any).book.count()
        ]);

        const recentIssues = await (prisma as any).libraryIssue.findMany({
            where: { studentId: student.id },
            take: 5,
            orderBy: { issueDate: 'desc' },
            include: { book: true }
        });

        const myShelf = recentIssues.map((issue: any) => ({
            id: issue.id,
            bookTitle: issue.book.title,
            issueDate: issue.issueDate.toISOString().split('T')[0],
            dueDate: issue.dueDate.toISOString().split('T')[0],
            status: issue.status,
            // fine: issue.fineAmount // Removed fine from myShelf
        }));

        // Recommended books logic (mock or simple logic)
        const recommendedBooks = await (prisma as any).book.findMany({
            take: 4,
            orderBy: { createdAt: 'desc' },
            where: { status: 'AVAILABLE' }
        });

        const recs = recommendedBooks.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            category: book.category,
            available: book.available > 0
        }));

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    borrowed: borrowedBooks,
                    overdue: overdueBooks,
                    totalLibraryBooks: totalBooks
                },
                myShelf,
                recommendations: recs,
                newArrivals: [] // Empty for now
            }
        });

    } catch (error) {
        console.error('Library Student API Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
