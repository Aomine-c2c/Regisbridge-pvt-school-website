/**
 * Site-wide statistics configuration
 * Single source of truth for all stats across the website
 */

export interface StatItem {
  value: string | number;
  label: string;
  icon: string;
}

// Core academic and operational stats
export const CORE_STATS = {
  students: { value: '450', label: 'Students', icon: 'school' },
  passRate: { value: '100%', label: 'Pass Rate', icon: 'verified' },
  teacherRatio: { value: '1:10', label: 'Teacher Ratio', icon: 'groups' },
  universityAcceptance: { value: '98%', label: 'Uni Acceptance', icon: 'history_edu' },
  yearsExcellence: { value: '50+', label: 'Years of Excellence', icon: 'workspace_premium' },
} as const;

// Heritage and history stats
export const HERITAGE_STATS = {
  founded: { value: '1974', label: 'Founded', icon: 'calendar_today' },
  passRate: { value: '100%', label: 'Pass Rate', icon: 'verified' },
  boarders: { value: '300+', label: 'Boarders', icon: 'home' },
  campusAcres: { value: '50+', label: 'Acres of Campus', icon: 'terrain' },
} as const;

// Academic-specific stats
export const ACADEMIC_STATS = {
  passRate: { value: '100%', label: 'Pass Rate', icon: 'verified' },
  universityAcceptance: { value: '98%', label: 'University Acceptance', icon: 'history_edu' },
  advancedPlacement: { value: '85%', label: 'Advanced Placement', icon: 'workspace_premium' },
  scholarships: { value: '$2M+', label: 'Scholarships Awarded', icon: 'paid' },
} as const;

// Admissions and enrollment stats
export const ENROLLMENT_STATS = {
  classSize: { value: '1:10', label: 'Student-Teacher Ratio', icon: 'groups' },
  students: { value: '450', label: 'Total Students', icon: 'school' },
  diversity: { value: '25+', label: 'Countries Represented', icon: 'public' },
  acceptance: { value: '75%', label: 'Acceptance Rate', icon: 'how_to_reg' },
} as const;

// Campus and facilities stats
export const CAMPUS_STATS = {
  acres: { value: '50+', label: 'Acres', icon: 'terrain' },
  boardingCapacity: { value: '300+', label: 'Boarding Capacity', icon: 'home' },
  facilities: { value: '15+', label: 'Sport Facilities', icon: 'sports_soccer' },
  labs: { value: '8', label: 'Science Labs', icon: 'science' },
} as const;

// Staff and faculty stats
export const STAFF_STATS = {
  faculty: { value: '85', label: 'Faculty Members', icon: 'person' },
  experience: { value: '15+', label: 'Avg Years Experience', icon: 'verified' },
  qualifications: { value: '90%', label: 'Advanced Degrees', icon: 'workspace_premium' },
  support: { value: '45', label: 'Support Staff', icon: 'group' },
} as const;

// Convert to array format for easy rendering
export function statsToArray<T extends Record<string, StatItem>>(stats: T): StatItem[] {
  return Object.values(stats);
}

// Helper to get specific stats by keys
export function getStats(stats: Record<string, StatItem>, keys: string[]): StatItem[] {
  return keys
    .map(key => stats[key])
    .filter(Boolean);
}
