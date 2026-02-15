import { NextRequest, NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/settings';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/settings
export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const settings = await getSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST /api/admin/settings
export async function POST(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const body = await request.json();
    const updatedSettings = await saveSettings(body);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
