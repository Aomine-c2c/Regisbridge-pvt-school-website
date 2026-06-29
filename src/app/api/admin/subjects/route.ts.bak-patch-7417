import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        const searchParams = request.nextUrl.searchParams;
        const grade = searchParams.get('grade');
        const teacherId = searchParams.get('teacherId');

        const where: any = {};
        if (grade) where.grade = grade;
        if (teacherId) where.teacherId = teacherId;

        const subjects = await db.subject.findMany({
            where,
            include: {
                teachers: {
                    include: {
                        teacher: {
                            include: {
                                user: {
                                    select: { firstName: true, lastName: true }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: { name: 'asc' }
        });

        return NextResponse.json({ success: true, data: subjects });
    } catch (error) {
        console.error('Fetch Subjects Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
