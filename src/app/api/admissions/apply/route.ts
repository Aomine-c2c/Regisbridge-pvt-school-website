import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      firstName, lastName, dateOfBirth, gender,
      parentName, parentEmail, parentPhone,
      currentSchool, gradeApplying, startDate
    } = body;

    // Validation (basic)
    if (!firstName || !lastName || !parentEmail || !gradeApplying) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const application = await prisma.studentApplication.create({
      data: {
        firstName, 
        lastName, 
        dateOfBirth: new Date(dateOfBirth), 
        gender,
        parentName, 
        parentEmail, 
        parentPhone,
        currentSchool, 
        gradeApplying, 
        intendedStartDate: new Date(startDate),
        status: 'PENDING'
      }
    });

    return NextResponse.json({ success: true, data: application, message: 'Application submitted successfully' });

  } catch (error) {
    console.error('Admissions API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
