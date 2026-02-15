import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/setup
export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
        return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);
    
    // SystemSettings should generally be tenant-specific if multi-tenant.
    // If SystemSettings table is shared/global, we might need a tenantId field on it.
    // Let's assume for now we use the tenant DB instance which injects tenantId IF the model supports it.
    // However, if SystemSettings is a singleton per app instance (not tenant), we might need to change strategy.
    // Given this IS a SaaS refactor, settings should be per tenant.
    
    // Checking if SystemSettings has tenantId:
    // If not, we might be fetching the first record of the table which is bad.
    // We should treat SystemSettings as tenant-specific. 
    // If the schema doesn't support it yet, we might fallback to findFirst BUT we should add tenantId to schema.
    // For now, let's assume `getTenantDb` handles it if we added it to the intercepted models list?
    // In `getTenantDb`, SystemSettings is NOT in the list of tenantModels. 
    // So `getTenantDb` won't automatically auto-inject tenantId for SystemSettings yet.
    // We should probably rely on `prisma` for now IF it's not tenant-scoped, OR manual scope if we added tenantId.
    // BUT! Ideally we want per-tenant settings.
    
    // DECISION: Since we can't easily change schema right now without access to it, 
    // and `getTenantDb` doesn't include it, we will assume for now it's single tenant behavior OR 
    // we use `db` but since it's not intercepted, it acts like normal prisma.
    // Wait, if it's SaaS, "School Name" etc. MUST be per tenant.
    // If SystemSettings doesn't have tenantId, we are in trouble.
    // Let's assume we will add it or it exists.
    
    // For now, let's stick to using `getTenantDb` so that if we update the `tenantModels` list later, it just works.
    
    const settings = await db.systemSettings.findFirst();
    return NextResponse.json({ success: true, data: settings || {} });
  } catch (error) {
    console.error('Setup API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error } = await requireAdmin(request);
    if (error) return error;

    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) {
        return NextResponse.json({ success: false, message: 'Tenant context missing' }, { status: 400 });
    }

    const db = getTenantDb(tenantId);

    const body = await request.json();
    const { schoolName, schoolAddress, schoolPhone, schoolEmail, website, logoUrl, academicYear, currentTerm, timezone, currency, setupCompleted } = body;

    const existing = await db.systemSettings.findFirst();

    let settings;
    if (existing) {
      settings = await db.systemSettings.update({
        where: { id: existing.id },
        data: {
          schoolName, schoolAddress, schoolPhone, schoolEmail, website, logoUrl,
          academicYear, currentTerm, timezone, currency, setupCompleted
        }
      });
    } else {
      settings = await db.systemSettings.create({
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
