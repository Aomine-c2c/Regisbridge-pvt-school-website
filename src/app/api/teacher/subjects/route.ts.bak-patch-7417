import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

                if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = (tenantId);

        // Fetch teacher's subjects via profile
        const teacherUser = await db.user.findUnique({
            where: { id: user!.userId },
            select: {
                teacherProfile: {
                    select: {
                        subjectsTaught: {
                            select: {
                                subject: {
                                    select: {
                                        id: true,
                                        name: true,
                                        code: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!teacherUser || !teacherUser.teacherProfile) {
            return NextResponse.json({ success: false, message: 'Teacher profile not found' }, { status: 404 });
        }

        const subjects = teacherUser.teacherProfile.subjectsTaught.map((st: { subject: { id: string; name: string; code: string } }) => st.subject);
        return NextResponse.json({ success: true, data: subjects });
    } catch (err) {
         
        console.error('Teacher subjects fetch error:', err);
        return NextResponse.json({ success: false, message: 'Failed to fetch subjects' }, { status: 500 });
    }
}
