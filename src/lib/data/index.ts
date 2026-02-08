// Re-export all seed data for easier imports
// Note: Some modules have conflicting exports, so we use selective exports with aliases

export * from './seed-data-academics'
export * from './seed-data-community-programs'
export * from './seed-data-correspondence'
export { academicCalendar2021 as enrollmentCalendar2021 } from './seed-data-enrollment'
export * from './seed-data-facilities'
export { academicCalendar2021 as feesAcademicCalendar2021 } from './seed-data-fees-historical'
export * from './seed-data-fees'
export * from './seed-data-financial'
export * from './seed-data-governance'
export * from './seed-data-legal'
export * from './seed-data-operations'
export * from './seed-data-staff-recruitment'
export * from './seed-data-staff'
