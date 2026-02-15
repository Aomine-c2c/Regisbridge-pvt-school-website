import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { error } = await requireTeacher(request);
        if (error) return error;

        const tenantId = request.headers.get('x-tenant-id');
        if (!tenantId) {
             return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
        }

        const db = getTenantDb(tenantId);

        const { searchParams } = new URL(request.url);
        const classId = searchParams.get('classId');
        const subjectId = searchParams.get('subjectId');
        const term = searchParams.get('term') || 'Term 1';
        const academicYear = searchParams.get('academicYear') || '2025-2026'; 

        if (!classId || !subjectId) {
            return NextResponse.json({ success: false, message: 'Missing classId or subjectId' }, { status: 400 });
        }

        // Fetch Class to get grade level
        const classDetails = await db.class.findUnique({
            where: { id: classId },
            select: { gradeLevel: true, tenantId: true } 
        });

        if (!classDetails) {
            return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        // Security Check
        if (classDetails.tenantId && classDetails.tenantId !== tenantId) {
             return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        // Fetch Students
        const studentsInClass = await db.student.findMany({
            where: { class: { id: classId } },
            select: { id: true, user: { select: { firstName: true, lastName: true } }, admissionIdentifier: true }, 
            orderBy: { admissionIdentifier: 'asc' }
        });

        // Find Term ID
        const termRecord = await db.term.findFirst({
            where: {
                name: term,
                academicYear: {
                    name: academicYear
                }
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let existingGrades: any[] = [];
        if (termRecord) {
            existingGrades = await db.grade.findMany({
                where: {
                    studentId: { in: studentsInClass.map(s => s.id) },
                    subjectId: subjectId,
                    termId: termRecord.id
                }
            });
        }

        const gradeMap = new Map(existingGrades.map(g => [g.studentId, g]));

        const gradeSheet = studentsInClass.map(s => {
            const grade = gradeMap.get(s.id);
            return {
                studentId: s.id,
                name: `${s.user.firstName} ${s.user.lastName}`,
                rollNumber: s.admissionIdentifier, // Mapped
                score: grade?.score || '',
                maxScore: grade?.maxScore || 100,
                remarks: grade?.remarks || ''
            };
        });

        return NextResponse.json({
            success: true,
            data: gradeSheet
        });

    } catch (error) {
        console.error('Grades Fetch Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch grades' }, { status: 500 });
    }
}

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

        const body = await request.json();
        const { classId, subjectId, term, academicYear, grades } = body; 
        
        if (!classId || !subjectId || !Array.isArray(grades)) {
             return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const safeTerm = term || 'Term 1';
        const safeYear = academicYear || '2025-2026';

        // Find Term ID
        const termRecord = await db.term.findFirst({
            where: {
                name: safeTerm,
                academicYear: {
                    name: safeYear
                }
            }
        });

        if (!termRecord) {
             return NextResponse.json({ success: false, message: `Term '${safeTerm}' not found for year '${safeYear}'` }, { status: 404 });
        }

        // Process grades
        for (const g of grades) {
            const score = parseFloat(g.score);
            const maxScore = parseFloat(g.maxScore) || 100;
            
            // Check if grade exists
            const existing = await db.grade.findFirst({
                where: {
                    studentId: g.studentId,
                    subjectId: subjectId,
                    termId: termRecord.id
                }
            });

            if (existing) {
                await db.grade.update({
                    where: { id: existing.id },
                    data: {
                        score,
                        maxScore,
                        remarks: g.remarks || null
                    }
                });
            } else {
                await db.grade.create({
                    data: {
                        studentId: g.studentId,
                        subjectId: subjectId,
                        termId: termRecord.id,
                        score,
                        maxScore,
                        remarks: g.remarks || null,
                        assessmentType: 'ASSIGNMENT', 
                    }
                });
            }
        }

        return NextResponse.json({ success: true, message: 'Grades saved successfully' });

    } catch (error) {
        console.error('Grades Save Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to save grades' }, { status: 500 });
    }
}
