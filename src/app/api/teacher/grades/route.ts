import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireTeacher } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest) {
    try {
        const { user, error } = await requireTeacher(request);
        if (error) return error;

        const { searchParams } = new URL(request.url);
        const classId = searchParams.get('classId');
        const subjectId = searchParams.get('subjectId');
        const term = searchParams.get('term') || 'Term 1';
        const academicYear = searchParams.get('academicYear') || '2025-2026'; // Default for MVP

        if (!classId || !subjectId) {
            return NextResponse.json({ success: false, message: 'Missing classId or subjectId' }, { status: 400 });
        }

        // Fetch Class to get grade level
        const classDetails = await prisma.class.findUnique({
            where: { id: classId },
            select: { grade: true }
        });

        if (!classDetails) {
            return NextResponse.json({ success: false, message: 'Class not found' }, { status: 404 });
        }

        // Fetch Students
        const students = await prisma.student.findMany({
            where: { currentGrade: classDetails.grade },
            select: { id: true, user: { select: { firstName: true, lastName: true } }, rollNumber: true },
            orderBy: { rollNumber: 'asc' }
        });

        // Fetch Existing Grades
        const existingGrades = await prisma.grade.findMany({
            where: {
                studentId: { in: students.map(s => s.id) },
                subjectId: subjectId,
                term: term,
                academicYear: academicYear
            }
        });

        const gradeMap = new Map(existingGrades.map(g => [g.studentId, g]));

        const gradeSheet = students.map(s => {
            const grade = gradeMap.get(s.id);
            return {
                studentId: s.id,
                name: `${s.user.firstName} ${s.user.lastName}`,
                rollNumber: s.rollNumber,
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

        const body = await request.json();
        const { classId, subjectId, term, academicYear, grades } = body; 
        // grades: { studentId, score, maxScore, remarks }[]

        if (!classId || !subjectId || !Array.isArray(grades)) {
             return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const safeTerm = term || 'Term 1';
        const safeYear = academicYear || '2025-2026';

        const ops = grades.map((g: any) => {
            const score = parseFloat(g.score);
            const maxScore = parseFloat(g.maxScore) || 100;
            const percentage = (score / maxScore) * 100;
            
            // Simple grading logic
            let letterGrade = 'F';
            if (percentage >= 90) letterGrade = 'A+';
            else if (percentage >= 80) letterGrade = 'A';
            else if (percentage >= 70) letterGrade = 'B';
            else if (percentage >= 60) letterGrade = 'C';
            else if (percentage >= 50) letterGrade = 'D';

            return prisma.grade.upsert({
                where: {
                    studentId_subjectId_term_academicYear: {
                        studentId: g.studentId,
                        subjectId: subjectId,
                        term: safeTerm,
                        academicYear: safeYear
                    }
                },
                update: {
                    score,
                    maxScore,
                    percentage,
                    letterGrade,
                    remarks: g.remarks,
                    gradedBy: user.userId,
                    gradedAt: new Date()
                },
                create: {
                    studentId: g.studentId,
                    subjectId: subjectId,
                    term: safeTerm,
                    academicYear: safeYear,
                    score,
                    maxScore,
                    percentage,
                    letterGrade,
                    assessmentType: 'ASSIGNMENT', // Default
                    remarks: g.remarks,
                    gradedBy: user.userId
                }
            });
        });

        await prisma.$transaction(ops);

        return NextResponse.json({ success: true, message: 'Grades saved successfully' });

    } catch (error) {
        console.error('Grades Save Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to save grades' }, { status: 500 });
    }
}
