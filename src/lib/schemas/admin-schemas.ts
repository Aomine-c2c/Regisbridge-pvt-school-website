import { z } from 'zod'

/**
 * Admin Portal Validation Schemas
 * Centralized Zod schemas for form validation
 */

// User Management Schemas
const userBaseSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  role: z.enum(['admin', 'teacher', 'parent', 'student']),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
})

export const createUserSchema = userBaseSchema.refine((data: any) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const updateUserSchema = userBaseSchema.partial().omit({ password: true, confirmPassword: true })

// Student Management Schemas
export const enrollStudentSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Invalid email'),
  dateOfBirth: z.string().refine((date: any) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    return age >= 3 && age <= 25
  }, 'Student must be between 3 and 25 years old'),
  grade: z.string().min(1, 'Grade required'),
  status: z.enum(['active', 'inactive', 'pending']),
  parentEmail: z.string().email('Invalid parent email'),
  phoneNumber: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number'),
})

export const updateStudentSchema = enrollStudentSchema.partial()

// Finance Schemas
export const recordPaymentSchema = z.object({
  studentId: z.string().uuid('Invalid student ID'),
  amount: z.number().positive('Amount must be positive'),
  paidAmount: z.number().positive().optional(),
  feeType: z.enum(['TUITION', 'BOARDING', 'EXTRA', 'ACTIVITY']),
  paymentMethod: z.enum(['CASH', 'BANK_TRANSFER', 'CARD', 'CHEQUE']),
  dueDate: z.string().datetime(),
  description: z.string().optional(),
})

export const updateFeeSchema = z.object({
  feeType: z.enum(['TUITION', 'BOARDING', 'EXTRA', 'ACTIVITY']),
  amount: z.number().positive('Amount must be positive'),
  grade: z.string().optional(),
  dueDate: z.string().datetime(),
  description: z.string().optional(),
})

// Staff Management Schemas
export const addStaffSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number'),
  department: z.string().min(1, 'Department required'),
  position: z.string().min(1, 'Position required'),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT']),
  startDate: z.string().datetime(),
  salary: z.number().positive().optional(),
  qualifications: z.array(z.string()).optional(),
})

export const updateStaffSchema = addStaffSchema.partial()

// System Settings Schemas
export const emailSettingsSchema = z.object({
  enabled: z.boolean(),
  smtpServer: z.string().url('Invalid SMTP server URL'),
  smtpPort: z.number().int().min(1).max(65535),
  smtpUsername: z.string(),
  smtpPassword: z.string().min(1, 'SMTP password required'),
  emailFromAddress: z.string().email('Invalid from email'),
  emailFromName: z.string().min(1),
  useTLS: z.boolean().default(true),
})

export const smsSettingsSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(['TWILIO', 'AWS_SNS', 'CUSTOM']),
  apiKey: z.string().min(1, 'API key required'),
  apiSecret: z.string().optional(),
  fromNumber: z.string().regex(/^\+?[\d\s\-()]{10,}$/, 'Invalid phone number'),
})

export const backupSettingsSchema = z.object({
  enableAutoBackup: z.boolean(),
  backupFrequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  backupTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  retentionDays: z.number().int().min(7).max(365),
})

// Attendance Schemas
export const recordAttendanceSchema = z.object({
  date: z.string().datetime(),
  grade: z.string().min(1),
  status: z.record(z.string(), z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'])),
  notes: z.string().optional(),
})

// Timetable Schemas
export const createTimetableSchema = z.object({
  grade: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  periods: z.array(z.object({
    dayOfWeek: z.number().int().min(1).max(7),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    subject: z.string(),
    room: z.string(),
    teacher: z.string(),
  })),
})

// Export all schemas as a map for dynamic validation
export const adminSchemas = {
  // Users
  createUser: createUserSchema,
  updateUser: updateUserSchema,
  
  // Students
  enrollStudent: enrollStudentSchema,
  updateStudent: updateStudentSchema,
  
  // Finance
  recordPayment: recordPaymentSchema,
  updateFee: updateFeeSchema,
  
  // Staff
  addStaff: addStaffSchema,
  updateStaff: updateStaffSchema,
  
  // Settings
  emailSettings: emailSettingsSchema,
  smsSettings: smsSettingsSchema,
  backupSettings: backupSettingsSchema,
  
  // Attendance
  recordAttendance: recordAttendanceSchema,
  
  // Timetable
  createTimetable: createTimetableSchema,
} as const

/**
 * Type exports for use in components
 */
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type EnrollStudentInput = z.infer<typeof enrollStudentSchema>
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>
export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>
export type UpdateFeeInput = z.infer<typeof updateFeeSchema>
export type AddStaffInput = z.infer<typeof addStaffSchema>
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>
export type EmailSettingsInput = z.infer<typeof emailSettingsSchema>
export type SmsSettingsInput = z.infer<typeof smsSettingsSchema>
export type BackupSettingsInput = z.infer<typeof backupSettingsSchema>
export type RecordAttendanceInput = z.infer<typeof recordAttendanceSchema>
export type CreateTimetableInput = z.infer<typeof createTimetableSchema>
