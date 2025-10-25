// Admin API Service
import type {
  User,
  Student,
  NewsArticle,
  Event,
  Class,
  Payment,
  FeeStructure,
  DashboardStats,
  EnrollmentData,
  RevenueData,
  AttendanceData,
  ActivityLog,
  SystemSettings,
  ApiResponse,
  PaginatedResponse,
  UserFormData,
  StudentFormData,
  NewsFormData,
  UserFilter,
  StudentFilter,
  PaymentFilter,
} from '@/types/admin';

const API_BASE_URL = 'http://localhost:3002/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Helper function for authenticated requests
async function authenticatedFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// ============================================================================
// USER MANAGEMENT
// ============================================================================

export const getAllUsers = async (filters?: UserFilter): Promise<PaginatedResponse<User>> => {
  const params = new URLSearchParams();
  if (filters?.role) params.append('role', filters.role);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await authenticatedFetch<PaginatedResponse<User>>(
    `${API_BASE_URL}/admin/users?${params.toString()}`
  );
  return response.data!;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await authenticatedFetch<User>(`${API_BASE_URL}/admin/users/${id}`);
  return response.data!;
};

export const createUser = async (userData: UserFormData): Promise<User> => {
  const response = await authenticatedFetch<User>(`${API_BASE_URL}/admin/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  return response.data!;
};

export const updateUser = async (id: string, userData: Partial<UserFormData>): Promise<User> => {
  const response = await authenticatedFetch<User>(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
  return response.data!;
};

export const deleteUser = async (id: string): Promise<void> => {
  await authenticatedFetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
  });
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const response = await authenticatedFetch<User[]>(
    `${API_BASE_URL}/admin/users/search?q=${encodeURIComponent(query)}`
  );
  return response.data!;
};

export const bulkDeleteUsers = async (ids: string[]): Promise<void> => {
  await authenticatedFetch(`${API_BASE_URL}/admin/users/bulk-delete`, {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
};

// ============================================================================
// STUDENT MANAGEMENT
// ============================================================================

export const getAllStudents = async (filters?: StudentFilter): Promise<PaginatedResponse<Student>> => {
  const params = new URLSearchParams();
  if (filters?.grade) params.append('grade', filters.grade);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await authenticatedFetch<PaginatedResponse<Student>>(
    `${API_BASE_URL}/admin/students?${params.toString()}`
  );
  return response.data!;
};

export const getStudentById = async (id: string): Promise<Student> => {
  const response = await authenticatedFetch<Student>(`${API_BASE_URL}/admin/students/${id}`);
  return response.data!;
};

export const enrollStudent = async (studentData: StudentFormData): Promise<Student> => {
  const response = await authenticatedFetch<Student>(`${API_BASE_URL}/admin/students`, {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
  return response.data!;
};

export const updateStudent = async (id: string, studentData: Partial<StudentFormData>): Promise<Student> => {
  const response = await authenticatedFetch<Student>(`${API_BASE_URL}/admin/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  });
  return response.data!;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await authenticatedFetch(`${API_BASE_URL}/admin/students/${id}`, {
    method: 'DELETE',
  });
};

export const getStudentAcademicRecords = async (id: string) => {
  const response = await authenticatedFetch(`${API_BASE_URL}/admin/students/${id}/records`);
  return response.data;
};

// ============================================================================
// CONTENT MANAGEMENT
// ============================================================================

export const getAllNews = async (): Promise<NewsArticle[]> => {
  const response = await authenticatedFetch<NewsArticle[]>(`${API_BASE_URL}/admin/news`);
  return response.data!;
};

export const getNewsById = async (id: string): Promise<NewsArticle> => {
  const response = await authenticatedFetch<NewsArticle>(`${API_BASE_URL}/admin/news/${id}`);
  return response.data!;
};

export const createNews = async (newsData: NewsFormData): Promise<NewsArticle> => {
  const response = await authenticatedFetch<NewsArticle>(`${API_BASE_URL}/admin/news`, {
    method: 'POST',
    body: JSON.stringify(newsData),
  });
  return response.data!;
};

export const updateNews = async (id: string, newsData: Partial<NewsFormData>): Promise<NewsArticle> => {
  const response = await authenticatedFetch<NewsArticle>(`${API_BASE_URL}/admin/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newsData),
  });
  return response.data!;
};

export const deleteNews = async (id: string): Promise<void> => {
  await authenticatedFetch(`${API_BASE_URL}/admin/news/${id}`, {
    method: 'DELETE',
  });
};

export const publishNews = async (id: string): Promise<NewsArticle> => {
  const response = await authenticatedFetch<NewsArticle>(`${API_BASE_URL}/admin/news/${id}/publish`, {
    method: 'POST',
  });
  return response.data!;
};

// ============================================================================
// EVENT MANAGEMENT
// ============================================================================

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await authenticatedFetch<Event[]>(`${API_BASE_URL}/admin/events`);
  return response.data!;
};

export const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
  const response = await authenticatedFetch<Event>(`${API_BASE_URL}/admin/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
  return response.data!;
};

export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
  const response = await authenticatedFetch<Event>(`${API_BASE_URL}/admin/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  });
  return response.data!;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await authenticatedFetch(`${API_BASE_URL}/admin/events/${id}`, {
    method: 'DELETE',
  });
};

// ============================================================================
// ACADEMIC MANAGEMENT
// ============================================================================

export const getAllClasses = async (): Promise<Class[]> => {
  const response = await authenticatedFetch<Class[]>(`${API_BASE_URL}/admin/classes`);
  return response.data!;
};

export const createClass = async (classData: Partial<Class>): Promise<Class> => {
  const response = await authenticatedFetch<Class>(`${API_BASE_URL}/admin/classes`, {
    method: 'POST',
    body: JSON.stringify(classData),
  });
  return response.data!;
};

export const updateClass = async (id: string, classData: Partial<Class>): Promise<Class> => {
  const response = await authenticatedFetch<Class>(`${API_BASE_URL}/admin/classes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(classData),
  });
  return response.data!;
};

export const deleteClass = async (id: string): Promise<void> => {
  await authenticatedFetch(`${API_BASE_URL}/admin/classes/${id}`, {
    method: 'DELETE',
  });
};

// ============================================================================
// FINANCE MANAGEMENT
// ============================================================================

export const getAllPayments = async (filters?: PaymentFilter): Promise<PaginatedResponse<Payment>> => {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.feeType) params.append('feeType', filters.feeType);
  if (filters?.term) params.append('term', filters.term);
  if (filters?.academicYear) params.append('academicYear', filters.academicYear);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.limit) params.append('limit', filters.limit.toString());

  const response = await authenticatedFetch<PaginatedResponse<Payment>>(
    `${API_BASE_URL}/admin/payments?${params.toString()}`
  );
  return response.data!;
};

export const createPayment = async (paymentData: Partial<Payment>): Promise<Payment> => {
  const response = await authenticatedFetch<Payment>(`${API_BASE_URL}/admin/payments`, {
    method: 'POST',
    body: JSON.stringify(paymentData),
  });
  return response.data!;
};

export const updatePayment = async (id: string, paymentData: Partial<Payment>): Promise<Payment> => {
  const response = await authenticatedFetch<Payment>(`${API_BASE_URL}/admin/payments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(paymentData),
  });
  return response.data!;
};

export const getFeeStructures = async (): Promise<FeeStructure[]> => {
  const response = await authenticatedFetch<FeeStructure[]>(`${API_BASE_URL}/admin/fee-structures`);
  return response.data!;
};

export const createFeeStructure = async (feeData: Partial<FeeStructure>): Promise<FeeStructure> => {
  const response = await authenticatedFetch<FeeStructure>(`${API_BASE_URL}/admin/fee-structures`, {
    method: 'POST',
    body: JSON.stringify(feeData),
  });
  return response.data!;
};

// ============================================================================
// ANALYTICS & REPORTS
// ============================================================================

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await authenticatedFetch<DashboardStats>(`${API_BASE_URL}/admin/analytics/overview`);
  return response.data!;
};

export const getEnrollmentData = async (year?: number): Promise<EnrollmentData[]> => {
  const url = year 
    ? `${API_BASE_URL}/admin/analytics/enrollment?year=${year}`
    : `${API_BASE_URL}/admin/analytics/enrollment`;
  const response = await authenticatedFetch<EnrollmentData[]>(url);
  return response.data!;
};

export const getRevenueData = async (year?: number): Promise<RevenueData[]> => {
  const url = year
    ? `${API_BASE_URL}/admin/analytics/revenue?year=${year}`
    : `${API_BASE_URL}/admin/analytics/revenue`;
  const response = await authenticatedFetch<RevenueData[]>(url);
  return response.data!;
};

export const getAttendanceData = async (startDate?: string, endDate?: string): Promise<AttendanceData[]> => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const response = await authenticatedFetch<AttendanceData[]>(
    `${API_BASE_URL}/admin/analytics/attendance?${params.toString()}`
  );
  return response.data!;
};

export const getActivityLogs = async (limit: number = 50): Promise<ActivityLog[]> => {
  const response = await authenticatedFetch<ActivityLog[]>(
    `${API_BASE_URL}/admin/activity-logs?limit=${limit}`
  );
  return response.data!;
};

// ============================================================================
// SYSTEM SETTINGS
// ============================================================================

export const getSystemSettings = async (): Promise<SystemSettings> => {
  const response = await authenticatedFetch<SystemSettings>(`${API_BASE_URL}/admin/settings`);
  return response.data!;
};

export const updateSystemSettings = async (settings: Partial<SystemSettings>): Promise<SystemSettings> => {
  const response = await authenticatedFetch<SystemSettings>(`${API_BASE_URL}/admin/settings`, {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
  return response.data!;
};

// ============================================================================
// EXPORT/IMPORT
// ============================================================================

export const exportUsersToCSV = async (): Promise<Blob> => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/export/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.blob();
};

export const exportStudentsToCSV = async (): Promise<Blob> => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/export/students`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.blob();
};

export const exportPaymentsToCSV = async (): Promise<Blob> => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/export/payments`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.blob();
};

export const importUsersFromCSV = async (file: File): Promise<{ success: number; errors: string[] }> => {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/admin/import/users`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};
