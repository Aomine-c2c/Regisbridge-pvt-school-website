// API Service for Regisbridge School Website
// This provides integration capabilities for external systems

// Next.js API routes - use relative paths in production, localhost in dev
import { isBrowser } from '@/lib/platform'

const API_BASE_URL = isBrowser()
  ? (window.location.hostname === 'localhost' ? 'http://localhost:3000' : '')
  : '';

// Demo data for development - replace with real API calls
const DEMO_DATA = {
  students: [
    {
      id: 'STU001',
      name: 'John Smith',
      grade: 'Form 3A',
      email: 'john.smith@student.regisbridge.ac.zw',
      grades: [
        { subject: 'Mathematics', grade: 'A', percentage: 92, teacher: 'Mrs. Johnson' },
        { subject: 'English', grade: 'A-', percentage: 88, teacher: 'Ms. Davis' },
        { subject: 'Science', grade: 'B+', percentage: 85, teacher: 'Mr. Thompson' },
        { subject: 'Social Studies', grade: 'A', percentage: 91, teacher: 'Mrs. Nkosi' },
        { subject: 'ICT', grade: 'A-', percentage: 87, teacher: 'Mr. Wilson' },
      ],
      assignments: [
        { title: 'Mathematics Assignment 3', subject: 'Mathematics', dueDate: '2025-01-20', status: 'submitted' },
        { title: 'Science Lab Report', subject: 'Science', dueDate: '2025-01-22', status: 'pending' },
        { title: 'English Essay', subject: 'English', dueDate: '2025-01-25', status: 'draft' },
      ],
      announcements: [
        { title: 'Term 2 Examination Schedule', date: '2025-01-15', priority: 'high' },
        { title: 'Sports Day Registration Open', date: '2025-01-12', priority: 'medium' },
        { title: 'Library Book Return Reminder', date: '2025-01-10', priority: 'low' },
      ]
    }
  ],
  events: [
    { date: '2025-01-15', title: 'Term 2 Opening', type: 'academic' },
    { date: '2025-02-14', title: 'Valentine\'s Day Assembly', type: 'cultural' },
    { date: '2025-03-10', title: 'Science Fair', type: 'academic' },
    { date: '2025-03-25', title: 'Sports Day', type: 'sports' },
    { date: '2025-04-02', title: 'Easter Break Begins', type: 'holiday' },
  ],
  sports: {
    football: {
      teams: [
        { name: 'Senior Boys', coach: 'Mr. Ndlovu', players: 22, achievements: 'Regional Champions 2024' },
        { name: 'Junior Boys', coach: 'Mr. Moyo', players: 18, achievements: 'District Winners 2024' },
      ]
    }
  }
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StudentData {
  id: string;
  name: string;
  grade: string;
  email: string;
}

export interface ApplicationData {
  id: string;
  studentName: string;
  parentEmail: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  submittedDate: string;
}

export interface PaymentData {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Student Portal APIs
  async authenticateStudent(email: string, password: string): Promise<ApiResponse<StudentData>> {
    return this.request<StudentData>('/auth/student/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getStudentGrades(studentId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/students/${studentId}/grades`);
  }

  async getStudentAssignments(studentId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/students/${studentId}/assignments`);
  }

  // Application APIs
  async submitApplication(applicationData: any): Promise<ApiResponse<ApplicationData>> {
    return this.request<ApplicationData>('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async uploadDocument(file: File, applicationId: string): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('applicationId', applicationId);

    return this.request('/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }

  // Financial APIs
  async getFeeStructure(): Promise<ApiResponse<any>> {
    return this.request('/fees/structure');
  }

  async getPaymentHistory(studentId: string): Promise<ApiResponse<PaymentData[]>> {
    return this.request<PaymentData[]>(`/payments/student/${studentId}`);
  }

  async processPayment(paymentData: any): Promise<ApiResponse<PaymentData>> {
    return this.request<PaymentData>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Calendar APIs
  async getEvents(startDate?: string, endDate?: string): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate);
    if (endDate) params.append('end', endDate);

    return this.request(`/events?${params.toString()}`);
  }

  async createEvent(eventData: any): Promise<ApiResponse<any>> {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // News APIs
  async getNews(page: number = 1, limit: number = 10): Promise<ApiResponse<any[]>> {
    return this.request(`/news?page=${page}&limit=${limit}`);
  }

  async getNewsById(id: string): Promise<ApiResponse<any>> {
    return this.request(`/news/${id}`);
  }

  // Contact Form API
  async submitContactForm(formData: any): Promise<ApiResponse<any>> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Newsletter API
  async subscribeToNewsletter(email: string): Promise<ApiResponse<any>> {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Sports APIs
  async getSportsTeams(): Promise<ApiResponse<any[]>> {
    return this.request('/sports/teams');
  }

  async getSportsSchedule(): Promise<ApiResponse<any[]>> {
    return this.request('/sports/schedule');
  }

  // Staff Directory API
  async getStaffDirectory(): Promise<ApiResponse<any[]>> {
    return this.request('/staff');
  }

  // Analytics API (for admin use)
  async getAnalyticsData(): Promise<ApiResponse<any>> {
    return this.request('/analytics');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Utility functions for common operations
export const apiUtils = {
  // Retry failed requests
  async retryRequest<T>(
    requestFn: () => Promise<ApiResponse<T>>,
    maxRetries: number = 3
  ): Promise<ApiResponse<T>> {
    for (let i = 0; i < maxRetries; i++) {
      const result = await requestFn();
      if (result.success) {
        return result;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
    return { success: false, error: 'Max retries exceeded' };
  },

  // Cache responses
  cache: new Map<string, { data: unknown; timestamp: number }>(),

  async cachedRequest<T>(
    key: string,
    requestFn: () => Promise<ApiResponse<T>>,
    ttl: number = 5 * 60 * 1000 // 5 minutes
  ): Promise<ApiResponse<T>> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return { success: true, data: cached.data as T };
    }

    const result = await requestFn();
    if (result.success && result.data) {
      this.cache.set(key, { data: result.data, timestamp: Date.now() });
    }

    return result;
  },
};

export default apiService;