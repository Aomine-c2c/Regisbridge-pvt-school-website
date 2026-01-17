import { NextRequest, NextResponse } from 'next/server'

// Simple protected cron endpoint.
// Configure a CRON_SECRET in Vercel (Production, Preview, Development) and
// set the Authorization header to `Bearer ${CRON_SECRET}` in the Vercel cron job.
export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : ''

    if (!process.env.CRON_SECRET) {
      return NextResponse.json(
        { success: false, message: 'CRON_SECRET is not configured' },
        { status: 500 }
      )
    }

    if (token !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Replace with real daily tasks (reports, cleanup, emails, etc.)
    const now = new Date()

    return NextResponse.json(
      {
        success: true,
        message: 'Daily cron executed',
        timestamp: now.toISOString(),
        env: process.env.VERCEL_ENV || process.env.NODE_ENV || 'production',
      },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Cron failed' },
      { status: 500 }
    )
  }
}
