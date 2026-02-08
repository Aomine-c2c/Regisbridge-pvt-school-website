// Validation utilities
import Joi from 'joi'

// User validation schemas
export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  role: Joi.string().valid('student', 'teacher', 'admin', 'parent').required()
})

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

// Student validation schemas
export const studentSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  grade: Joi.string().required(),
  studentId: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('male', 'female', 'other').required()
})

// Fee validation schema
export const feePaymentSchema = Joi.object({
  studentId: Joi.string().required(),
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string().valid('cash', 'bank_transfer', 'online').required(),
  description: Joi.string().optional()
})

// Attendance validation schema
export const attendanceSchema = Joi.object({
  studentId: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string().valid('present', 'absent', 'late', 'excused').required(),
  notes: Joi.string().optional()
})

// Grade validation schema
export const gradeSchema = Joi.object({
  studentId: Joi.string().required(),
  subjectId: Joi.string().required(),
  score: Joi.number().min(0).max(100).required(),
  grade: Joi.string().valid('A', 'B', 'C', 'D', 'F').required(),
  term: Joi.string().required(),
  academicYear: Joi.string().required()
})

// Helper function to validate data against schema
export function validateData<T>(schema: Joi.ObjectSchema, data: unknown): { valid: boolean; error?: string; value?: T } {
  const { error, value } = schema.validate(data, { abortEarly: false })
  
  if (error) {
    return {
      valid: false,
      error: error.details.map(d => d.message).join(', ')
    }
  }
  
  return { valid: true, value: value as T }
}
