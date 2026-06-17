import { prisma } from "@/lib/db";

export interface AuditLogEntry {
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  userId?: string;
    ipAddress?: string;
  userAgent?: string;
}

export const auditService = {
  async log(entry: AuditLogEntry) {
    try {
      await prisma.auditLog.create({
        data: {
          action: entry.action,
          resource: entry.resource,
          resourceId: entry.resourceId,
          details: entry.details ? JSON.stringify(entry.details) : null,
          userId: entry.userId,
          ipAddress: entry.ipAddress,
          userAgent: entry.userAgent,
        },
      });
    } catch (error) {
      console.error("Failed to create audit log:", error);
      // Fail silently to avoid interrupting the main flow
    }
  },

  async getLogs(limit = 50) {
    return prisma.auditLog.findMany({
      where: {},
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },
};
