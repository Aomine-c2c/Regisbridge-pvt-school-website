// Authentication Configuration
export const AUTH_CONFIG = {
    ACCESS_TOKEN_EXPIRY: 7 * 24 * 60 * 60, // 7 days in seconds
    REFRESH_TOKEN_EXPIRY: 30 * 24 * 60 * 60, // 30 days in seconds
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 128,
    PASSWORD_HASH_ROUNDS: 10,
} as const

// Rate Limiting Configuration
export const RATE_LIMIT_CONFIG = {
    LOGIN: {
        MAX_ATTEMPTS: 5,
        WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 minutes
    },
    API: {
        MAX_REQUESTS: 100,
        WINDOW_MS: 60 * 1000, // 1 minute
    },
    REGISTRATION: {
        MAX_ATTEMPTS: 3,
        WINDOW_MS: 60 * 60 * 1000, // 1 hour
    },
} as const

// Pagination Configuration
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1,
} as const

// Application Settings
export const APP_CONFIG = {
    NAME: 'Regisbridge School Management System',
    SHORT_NAME: 'Regisbridge',
    DESCRIPTION: 'Comprehensive school management platform for Regisbridge Private School',
    VERSION: '1.0.0',
    SUPPORT_EMAIL: 'support@regisbridge.ac.zw',
} as const

// File Upload Configuration
export const UPLOAD_CONFIG = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,
    ALLOWED_DOCUMENT_TYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ] as const,
} as const

// Academic Configuration
export const ACADEMIC_CONFIG = {
    CURRENT_YEAR: '2024',
    TERMS: ['Term 1', 'Term 2', 'Term 3'] as const,
    GRADE_LEVELS: [
        'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7',
        'Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6',
    ] as const,
    ASSESSMENT_TYPES: ['Test', 'Quiz', 'Homework', 'Exam', 'Project', 'Participation'] as const,
    ATTENDANCE_STATUS: ['present', 'absent', 'late', 'excused'] as const,
} as const

// Grading Scale
export const GRADING_SCALE = {
    A: { min: 90, max: 100, gpa: 4.0 },
    B: { min: 80, max: 89, gpa: 3.0 },
    C: { min: 70, max: 79, gpa: 2.0 },
    D: { min: 60, max: 69, gpa: 1.0 },
    F: { min: 0, max: 59, gpa: 0.0 },
} as const

// Error Messages
export const ERROR_MESSAGES = {
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid email or password',
        TOKEN_EXPIRED: 'Your session has expired. Please log in again',
        UNAUTHORIZED: 'You are not authorized to access this resource',
        ACCOUNT_DISABLED: 'Your account has been disabled. Please contact support',
        TOO_MANY_ATTEMPTS: 'Too many login attempts. Please try again later',
    },
    VALIDATION: {
        REQUIRED_FIELD: (field: string) => `${field} is required`,
        INVALID_EMAIL: 'Please enter a valid email address',
        PASSWORD_TOO_SHORT: `Password must be at least ${AUTH_CONFIG.MIN_PASSWORD_LENGTH} characters`,
        PASSWORD_TOO_LONG: `Password must be less than ${AUTH_CONFIG.MAX_PASSWORD_LENGTH} characters`,
        INVALID_GRADE: 'Invalid grade level',
        INVALID_TERM: 'Invalid term',
        INVALID_YEAR: 'Invalid academic year',
    },
    DATABASE: {
        CONNECTION_ERROR: 'Database connection error. Please try again',
        NOT_FOUND: (resource: string) => `${resource} not found`,
        DUPLICATE_ENTRY: (field: string) => `${field} already exists`,
        UPDATE_FAILED: 'Failed to update record',
        DELETE_FAILED: 'Failed to delete record',
    },
    GENERAL: {
        SOMETHING_WENT_WRONG: 'Something went wrong. Please try again',
        SERVER_ERROR: 'Internal server error. Please contact support',
        MAINTENANCE: 'System is currently under maintenance. Please try again later',
    },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
    AUTH: {
        LOGIN_SUCCESS: 'Successfully logged in',
        LOGOUT_SUCCESS: 'Successfully logged out',
        REGISTRATION_SUCCESS: 'Account created successfully',
        PASSWORD_RESET: 'Password reset successfully',
    },
    CRUD: {
        CREATE_SUCCESS: (resource: string) => `${resource} created successfully`,
        UPDATE_SUCCESS: (resource: string) => `${resource} updated successfully`,
        DELETE_SUCCESS: (resource: string) => `${resource} deleted successfully`,
    },
    GRADE: {
        SUBMITTED: 'Grades submitted successfully',
        UPDATED: 'Grades updated successfully',
    },
    ATTENDANCE: {
        MARKED: 'Attendance marked successfully',
        UPDATED: 'Attendance updated successfully',
    },
} as const

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        VERIFY: '/api/auth/verify',
        REFRESH: '/api/auth/refresh',
    },
    ADMIN: {
        USERS: '/api/admin/users',
        USER_BY_ID: (id: string) => `/api/admin/users/${id}`,
        REGISTRATION_NUMBERS: '/api/admin/registration-numbers',
    },
    TEACHER: {
        ASSIGNMENTS_CREATE: '/api/teacher/assignments/create',
        GRADES_CREATE: '/api/teacher/grades/create',
        ATTENDANCE_MARK: '/api/teacher/attendance/mark',
        CLASSES: '/api/teacher/classes',
    },
    STUDENT: {
        GRADES: '/api/student/grades',
        ASSIGNMENTS: '/api/student/assignments',
        ATTENDANCE: '/api/student/attendance',
    },
} as const

// Cache Configuration
export const CACHE_CONFIG = {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    USER_DATA_TTL: 15 * 60 * 1000, // 15 minutes
    STATIC_DATA_TTL: 60 * 60 * 1000, // 1 hour
} as const
