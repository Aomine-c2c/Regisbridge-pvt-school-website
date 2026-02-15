import { prisma } from '@/lib/db';

import { unstable_cache } from 'next/cache';

export const getTenantFromHost = unstable_cache(
  async (host: string) => {
    // 1. Extract subdomain/domain
    // e.g. "school.app.com" -> slug: "school"
    // e.g. "portal.school.com" -> customDomain: "portal.school.com"
    
    // For local development, we might use "localhost:3000"
    // We can map "localhost" to "default-school"
    
    if (host.includes('localhost')) {
        return prisma.tenant.findUnique({
            where: { slug: 'default-school' },
            include: { features: true }
        });
    }
  
    const parts = host.split('.');
    
    // Assumption: parts[0] is the slug if it's a subdomain of our main domain
    // But we don't know the main domain reliably here without env vars.
    // Let's assume ANY subdomain is a tenant slug for now if valid DNS.
    // Or look up by custom domain first.
  
    let tenant = await prisma.tenant.findUnique({
      where: { customDomain: host },
      include: { features: true }
    });
  
    if (tenant) return tenant;
  
    // Fallback to slug (subdomain)
    // Logic depends on domain structure.
    // For now, let's just query by slug if it looks like a subdomain.
    if (parts.length >= 2) {
        const slug = parts[0];
        tenant = await prisma.tenant.findUnique({
          where: { slug },
          include: { features: true }
        });
    }
  
    return tenant;
  },
  ['tenant-resolution'],
  { revalidate: 3600, tags: ['tenant-config'] }
);
