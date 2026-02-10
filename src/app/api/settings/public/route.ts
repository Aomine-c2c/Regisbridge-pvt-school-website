import { NextResponse } from 'next/server';
import { getSettings } from '@/lib/settings';

export async function GET() {
  try {
    const settings = await getSettings();
    
    // Only expose non-sensitive fields
    const publicSettings = {
      schoolName: settings.schoolName,
      schoolEmail: settings.schoolEmail,
      schoolPhone: settings.schoolPhone,
      schoolAddress: settings.schoolAddress,
      motto: settings.motto,
      establishmentYear: settings.establishmentYear,
      campusSize: settings.campusSize,
      locationSummary: settings.locationSummary,
      social: {
        facebook: settings.facebookUrl,
        twitter: settings.twitterUrl,
        instagram: settings.instagramUrl,
        linkedin: settings.linkedinUrl,
        youtube: settings.youtubeUrl,
      },
      academicYear: settings.academicYear,
      currency: settings.currency,
      timezone: settings.timezone,
    };

    return NextResponse.json({ success: true, settings: publicSettings });
  } catch (error) {
    console.error('Error fetching public settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch school information' },
      { status: 500 }
    );
  }
}
