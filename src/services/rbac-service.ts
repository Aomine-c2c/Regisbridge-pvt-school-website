import { prisma } from "@/lib/db";

export const rbacService = {
  /**
   * Get all permissions for a user (from Role + Custom)
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRole: {
          include: {
            permissions: {
              include: { permission: true }
            }
          }
        },
        customPermissions: {
          include: { permission: true }
        }
      }
    });

    if (!user) return [];

    const rolePermissions = user.userRole?.permissions.map(p => p.permission.slug) || [];
    const customPermissions = user.customPermissions.map(p => p.permission.slug) || [];

    // Combine and deduplicate
    return Array.from(new Set([...rolePermissions, ...customPermissions]));
  },

  /**
   * Check if user has a specific permission
   */
  async hasPermission(userId: string, permissionSlug: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permissionSlug);
  },

  /**
   * Create or Update a Role with Permissions
   */
  async upsertRole(name: string, permissionIds: string[], description?: string) {
    // 1. Create/Update Role
    const role = await prisma.role.upsert({
      where: { 
        tenantId_name: { name } 
      },
      update: { description },
      create: { 
        name, 
        description 
      }
    });

    // 2. Sync Permissions (Delete existing, add new)
    // This is a simple "replace all" strategy
    await prisma.rolePermission.deleteMany({
      where: { roleId: role.id }
    });

    if (permissionIds.length > 0) {
      await prisma.rolePermission.createMany({
        data: permissionIds.map(permId => ({
          roleId: role.id,
          permissionId: permId
        }))
      });
    }

    return role;
  },

  /**
   * Seed/Sync Default Permissions
   */
  async syncDefaultPermissions() {
    const defaultPermissions = [
      { slug: "users.view", group: "User Management", description: "View users" },
      { slug: "users.create", group: "User Management", description: "Create users" },
      { slug: "users.edit", group: "User Management", description: "Edit users" },
      { slug: "users.delete", group: "User Management", description: "Delete users" },
      
      { slug: "finance.view", group: "Finance", description: "View financial records" },
      { slug: "finance.manage", group: "Finance", description: "Manage interactions" },
      
      { slug: "academic.view", group: "Academics", description: "View academic data" },
      { slug: "academic.manage", group: "Academics", description: "Manage classes/subjects" },
      
      { slug: "settings.manage", group: "Settings", description: "Manage system settings" },
    ];

    for (const perm of defaultPermissions) {
      await prisma.permission.upsert({
        where: { slug: perm.slug },
        update: { group: perm.group, description: perm.description },
        create: { slug: perm.slug, group: perm.group, description: perm.description }
      });
    }
  }
};
