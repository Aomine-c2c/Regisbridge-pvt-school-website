// Admin TypeScript Type Definitions

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  grade?: string;
  studentId?: string;
  phoneNumber?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  grade: string;
  className: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'withdrawn';
  phoneNumber?: string;
  address?: string;
  parentInfo: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  };
  medicalInfo?: {
    allergies?: string;
    medications?: string;
    emergencyContact?: string;
  };
  photo?: string;
  academicRecords?: AcademicRecord[];
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  term: string;
  year: string;
  subjects: SubjectGrade[];
  averageGrade: number;
  rank?: number;
  attendance: number;
  remarks?: string;
}

export interface SubjectGrade {
  subject: string;
  grade: number;
  remarks?: string;
  teacher: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  category: 'news' | 'announcement' | 'event';
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  endDate?: string;
  location: string;
  category: 'academic' | 'sports' | 'cultural' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees?: number;
  imageUrl?: string;
  createdAt: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  teacherId: string;
  students: string[];
  subjects: string[];
  schedule?: ClassSchedule[];
  academicYear: string;
}

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  feeType: 'tuition' | 'boarding' | 'exam' | 'transport' | 'other';
  term: string;
  academicYear: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  paymentDate?: string;
  paymentMethod?: 'cash' | 'bank_transfer' | 'mobile_money' | 'card';
  receiptNumber?: string;
  dueDate: string;
  createdAt: string;
}

export interface FeeStructure {
  id: string;
  grade: string;
  term: string;
  academicYear: string;
  fees: {
    tuition: number;
    boarding?: number;
    exam?: number;
    transport?: number;
    other?: number;
  };
  totalAmount: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalStudents: number;
  activeStudents: number;
  totalTeachers: number;
  totalParents: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  pendingApplications: number;
  recentEnrollments: number;
  attendanceRate: number;
  outstandingFees: number;
}

export interface EnrollmentData {
  month: string;
  count: number;
  year: number;
}

export interface RevenueData {
  month: string;
  amount: number;
  year: number;
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  rate: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details?: string;
  timestamp: string;
  ipAddress?: string;
}

export interface SystemSettings {
  schoolName: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolAddress: string;
  currentAcademicYear: string;
  currentTerm: string;
  termsPerYear: number;
  logo?: string;
  website?: string;
  emailSettings?: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpFrom: string;
  };
  smsSettings?: {
    provider: string;
    apiKey: string;
    senderId: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form data types
export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  grade?: string;
  studentId?: string;
  phoneNumber?: string;
  // allow status updates from admin forms (bulk/status changes)
  status?: 'active' | 'inactive' | 'suspended' | 'pending';
  password?: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  grade: string;
  className: string;
  phoneNumber?: string;
  address?: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parentRelationship: string;
  medicalAllergies?: string;
  medicalMedications?: string;
  emergencyContact?: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  excerpt: string;
  category: 'news' | 'announcement' | 'event';
  imageUrl?: string;
  tags?: string[];
  status: 'draft' | 'published';
  publishDate?: string;
}

// Filter/Search types
export interface UserFilter {
  role?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface StudentFilter {
  grade?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaymentFilter {
  status?: string;
  feeType?: string;
  term?: string;
  academicYear?: string;
  search?: string;
  page?: number;
  limit?: number;
}
