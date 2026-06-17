/**
 * Centralized API Client for Admin Portal
 * Handles authentication, error handling, retries, and type safety
 */

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  retries?: number;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RETRIES = 2;

/**
 * Get auth token from secure context
 * In production, use httpOnly cookie via middleware
 * For now, retrieve from sessionStorage (more secure than localStorage)
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try sessionStorage first (more secure)
    return sessionStorage.getItem('authToken') || localStorage.getItem('token');
  } catch {
    return null;
  }
}

/**
 * Main API request function with retry logic and error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    retries = DEFAULT_RETRIES,
    timeout = DEFAULT_TIMEOUT,
  } = options;

  const token = getAuthToken();
  const url = `${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message ||
          errorData.error ||
          `HTTP ${response.status}: ${response.statusText}`;

        throw new ApiError(errorMessage, response.status, errorData);
      }

      const data = await response.json();

      // Validate response shape
      if (!isApiResponse(data)) {
        console.warn('Unexpected API response shape:', data);
      }

      return data?.data ?? data;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on certain errors
      if (error instanceof ApiError && error.status === 401) {
        // Unauthorized - clear token and redirect to login
        clearAuthToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw error;
      }

      if (error instanceof ApiError && error.status === 403) {
        // Forbidden - don't retry
        throw error;
      }

      // Retry on network/timeout errors
      if (attempt < retries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise((resolve: any) => setTimeout(resolve, delay));
        continue;
      }
    }
  }

  throw lastError || new Error('API request failed');
}

/**
 * Type guard for API response shape
 */
function isApiResponse<T>(data: unknown): data is ApiResponse<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('success' in data || 'data' in data)
  );
}

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Clear authentication token (on logout or unauthorized)
 */
function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('token');
  } catch {
    // Storage access denied
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
const apiClient = {
  get: <T = unknown>(endpoint: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = unknown>(endpoint: string, body?: unknown, options?: Omit<ApiClientOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T = unknown>(endpoint: string, body?: unknown, options?: Omit<ApiClientOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T = unknown>(endpoint: string, body?: unknown, options?: Omit<ApiClientOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T = unknown>(endpoint: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

export { apiClient, ApiError, clearAuthToken, getAuthToken, type ApiResponse, type ApiClientOptions };
