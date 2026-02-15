import { prisma } from "@/lib/db";

export const featureFlagService = {
  async getTenantFeatures(tenantId: string) {
    try {
      const features = await prisma.tenantFeatures.findUnique({
        where: { tenantId },
      });

      if (!features) {
        // Return defaults if no features record found
        return {
          enableFinance: true,
          enableHostel: false,
          enableTransport: false,
          enableLibrary: false,
          enableHR: true,
          enableEvents: true,
          enableBlog: true,
        };
      }
      return features;
    } catch (error) {
      console.error('Error fetching tenant features:', error);
      // Return safe defaults on error
      return {
        enableFinance: true,
        enableHostel: false,
        enableTransport: false,
        enableLibrary: false,
        enableHR: true,
        enableEvents: true,
        enableBlog: true,
      };
    }
  },

  async isFeatureEnabled(tenantId: string, feature: keyof Omit<import("@prisma/client").TenantFeatures, "id" | "tenantId" | "tenant">) {
    const features = await this.getTenantFeatures(tenantId);
    return features ? features[feature] : false;
  },
};
