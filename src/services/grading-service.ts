import { prisma } from "@/lib/db";

export interface GradeDefinition {
  label: string;
  min: number;
  max: number;
  gpa?: number;
}

export const gradingService = {
  async getGradingScale(tenantId: string, name?: string) {
    // If name is provided, find specific scale, otherwise find default or first
    const scale = await prisma.gradingScale.findFirst({
        where: { 
            tenantId,
            ...(name ? { name } : {})
        }
    });
    
    if (!scale) return null;

    try {
        return {
            ...scale,
            definition: JSON.parse(scale.definition) as GradeDefinition[]
        };
    } catch (e) {
        console.error("Failed to parse grading scale definition", e);
        return null;
    }
  },

  calculateGrade(score: number, scaleDefinitions: GradeDefinition[]) {
      // Find the range fitting the score
      // Assumes definitions are non-overlapping and cover the score
      const grade = scaleDefinitions.find(g => score >= g.min && score <= g.max);
      return grade || null;
  }
};
