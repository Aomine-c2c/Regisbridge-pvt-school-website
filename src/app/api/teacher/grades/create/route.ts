import { NextRequest, NextResponse } from 'next/server'
import { getTenantDb } from '@/lib/db'
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const tenantId = request.headers.get('x-tenant-id');
        if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = getTenantDb(tenantId);

        const body = await request.json()
        const { studentId, subjectId, score, maxScore, assessmentType, remarks } = body

        // Validate required fields
        if (!studentId || !subjectId || score === undefined || !maxScore || !assessmentType) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Verify teacher teaches this subject
        const subject = await db.subject.findFirst({
            where: {
                id: subjectId,
                teachers: {
                    some: { teacherId: user.userId }
                }
            },
        })

        if (!subject) {
            return NextResponse.json(
                { success: false, message: 'You do not teach this subject' },
                { status: 403 }
            )
        }

        // Get default term (MVP hack: Term 1)
        const term = await db.term.findFirst({
             where: { name: 'Term 1' } 
        });
        
        if (!term) {
             return NextResponse.json({ success: false, message: 'Term 1 not found (System not setup)' }, { status: 500 });
        }

        // Create grade
        const grade = await db.grade.create({
            data: {
                studentId,
                subjectId,
                termId: term.id,
                score,
                maxScore,
                assessmentType: assessmentType || 'EXAM', 
                remarks: remarks || null,
            },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Grade added successfully',
            grade,
        }, { status: 201 })
    } catch (error) {
        console.error('Create grade error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
