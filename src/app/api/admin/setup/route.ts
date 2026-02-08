import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const user = token ? await verifyAccessToken(token) : null;

    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    const settings = await prisma.systemSettings.findFirst();
    return NextResponse.json({ success: true, data: settings || {} });
  } catch (error) {
    console.error('Setup API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const user = token ? await verifyAccessToken(token) : null;

    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { schoolName, schoolAddress, schoolPhone, schoolEmail, website, logoUrl, academicYear, currentTerm, timezone, currency, setupCompleted } = body;

    // We only want one settings record, so upsert on a fixed ID or findFirst
    // Since we don't have a singleton pattern enforced by DB constraint easily (without unique index on a constant), 
    // we'll check if one exists.
    
    const existing = await prisma.systemSettings.findFirst();

    let settings;
    if (existing) {
      settings = await prisma.systemSettings.update({
        where: { id: existing.id },
        data: {
          schoolName, schoolAddress, schoolPhone, schoolEmail, website, logoUrl,
          academicYear, currentTerm, timezone, currency, setupCompleted
        }
      });
    } else {
      settings = await prisma.systemSettings.create({
        data: {
          schoolName, schoolAddress, schoolPhone, schoolEmail, website, logoUrl,
          academicYear, currentTerm, timezone, currency, setupCompleted: setupCompleted || false
        }
      });
    }

    return NextResponse.json({ success: true, data: settings });

  } catch (error) {
    console.error('Setup API Save Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save settings' }, { status: 500 });
  }
}
