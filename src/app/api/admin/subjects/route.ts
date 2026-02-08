import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

async function verifyAdminAccess(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return { authorized: false, error: 'No token' };
    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);
    if (!payload || (payload.role !== 'admin' && payload.role !== 'administrator')) return { authorized: false, error: 'Unauthorized' };
    return { authorized: true };
}

export async function GET(request: NextRequest) {
    try {
        const auth = await verifyAdminAccess(request);
        if (!auth.authorized) return NextResponse.json({ success: false, message: auth.error }, { status: 401 });

        const searchParams = request.nextUrl.searchParams;
        const grade = searchParams.get('grade');
        const teacherId = searchParams.get('teacherId');

        const where: any = {};
        if (grade) where.grade = grade;
        if (teacherId) where.teacherId = teacherId;

        const subjects = await prisma.subject.findMany({
            where,
            include: {
                teacher: { select: { firstName: true, lastName: true } }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({ success: true, data: subjects });
    } catch (error) {
        console.error('Fetch Subjects Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
