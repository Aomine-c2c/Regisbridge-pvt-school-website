// API Response Types
export interface GradeResponse {
    id: string
    studentId: string
    subjectId: string
    score: number
    maxScore: number
    percentage: number
    letterGrade: string
    term: string
    academicYear: string
    assessmentType: string
    weight: number
    comments?: string
    createdAt: string
    updatedAt: string
}

export interface AssignmentResponse {
    id: string
    title: string
    description: string
    subjectId: string
    dueDate: string
    totalPoints: number
    status: 'pending' | 'submitted' | 'graded' | 'overdue'
    fileUrl?: string
    createdAt: string
    updatedAt: string
}

export interface AssignmentSubmissionResponse {
    id: string
    assignmentId: string
    studentId: string
    fileUrl?: string
    textSubmission?: string
    score?: number
    feedback?: string
    status: 'submitted' | 'graded' | 'returned'
    submittedAt: string
    gradedAt?: string
}

export interface AttendanceResponse {
    id: string
    studentId: string
    date: string
    status: 'present' | 'absent' | 'late' | 'excused'
    notes?: string
    markedBy: string
    createdAt: string
}

export interface StudentResponse {
    id: string
    userId: string
    enrollmentDate: string
    currentGrade: string
    rollNumber: string
    parentInfo: ParentInfo
    status: 'active' | 'inactive' | 'graduated'
    user?: UserResponse
}

export interface UserResponse {
    id: string
    email: string
    firstName: string
    lastName: string
    role: 'admin' | 'teacher' | 'student' | 'parent'
    status: 'active' | 'inactive' | 'suspended'
    permissions?: string[]
    createdAt: string
    updatedAt: string
}

export interface SubjectResponse {
    id: string
    name: string
    code: string
    grade: string
    teacherId: string
    teacher?: UserResponse
    createdAt: string
    updatedAt: string
}

export interface FeePaymentResponse {
    id: string
    studentId: string
    amount: number
    feeType: string
    term: string
    academicYear: string
    status: 'pending' | 'paid' | 'overdue' | 'partial'
    paymentDate?: string
    paymentMethod?: string
    receiptNumber?: string
    transactionId?: string
    dueDate: string
    paidAmount: number
    balance: number
    notes?: string
    recordedBy: string
    createdAt: string
    updatedAt: string
}

export interface FinancialReportResponse {
    id: string
    reportType: 'income_expenditure' | 'balance_sheet' | 'cash_flow' | 'budget'
    title: string
    periodStart: string
    periodEnd: string
    periodLabel: string
    openingBalance: CurrencyBalance[]
    closingBalance: CurrencyBalance[]
    income: IncomeCategory[]
    expenses: ExpenseCategory[]
    totalIncome: CurrencyBalance[]
    totalExpenses: CurrencyBalance[]
    netPosition: CurrencyBalance[]
    status: 'draft' | 'pending_approval' | 'approved' | 'archived'
    approvalData?: ApprovalData
    documentUrl?: string
    notes?: string
    createdBy: string
    createdAt: string
    updatedAt: string
}

// Supporting Types
export interface ParentInfo {
    fatherName?: string
    fatherContact?: string
    fatherEmail?: string
    motherName?: string
    motherContact?: string
    motherEmail?: string
    guardianName?: string
    guardianContact?: string
    guardianEmail?: string
}

export interface CurrencyBalance {
    currency: string
    amount: number
}

export interface IncomeCategory {
    category: string
    amount: CurrencyBalance[]
    description?: string
}

export interface ExpenseCategory {
    category: string
    amount: CurrencyBalance[]
    description?: string
}

export interface ApprovalData {
    approvedBy: string
    approvedAt: string
    signatures?: string[]
}

// API Request Types
export interface CreateGradeRequest {
    studentId: string
    subjectId: string
    score: number
    maxScore: number
    term: string
    academicYear: string
    assessmentType: string
    weight: number
    comments?: string
}

export interface CreateAssignmentRequest {
    title: string
    description: string
    subjectId: string
    dueDate: string
    totalPoints: number
}

export interface MarkAttendanceRequest {
    studentId: string
    date: string
    status: 'present' | 'absent' | 'late' | 'excused'
    notes?: string
}

export interface CreateStudentRequest {
    userId: string
    enrollmentDate: string
    currentGrade: string
    rollNumber: string
    parentInfo: ParentInfo
}

export interface CreateUserRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    role: 'admin' | 'teacher' | 'student' | 'parent'
    permissions?: string[]
}

// Generic API Types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        pageSize: number
        total: number
        totalPages: number
    }
}

export interface ApiError {
    code: string
    message: string
    details?: Record<string, any>
}
