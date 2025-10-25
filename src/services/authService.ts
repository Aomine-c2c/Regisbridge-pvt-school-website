/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin';
  grade?: string;
  studentId?: string;
  createdAt?: string;
  permissions?: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

export interface VerifyResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
  };
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'parent' | 'teacher';
  grade?: string;
  studentId?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Token management
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

/**
 * Store authentication tokens
 */
export function setTokens(token: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

/**
 * Get access token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get refresh token
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Remove all authentication data
 */
export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Store user data
 */
export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get stored user data
 */
export function getUser(): User | null {
  const userData = localStorage.getItem(USER_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success && result.data) {
      // Store tokens and user data
      setTokens(result.data.token, result.data.refreshToken);
      setUser(result.data.user);
    }

    return result;
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to register',
    };
  }
}

/**
 * Login user
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success && result.data) {
      // Store tokens and user data
      setTokens(result.data.token, result.data.refreshToken);
      setUser(result.data.user);
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to login',
    };
  }
}

/**
 * Verify current token and get user data
 */
export async function verifyToken(): Promise<VerifyResponse> {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      message: 'No token found',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok && result.success && result.data) {
      // Update stored user data
      setUser(result.data.user);
    }

    return result;
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify token',
    };
  }
}

/**
 * Refresh access token
 */
export async function refreshAccessToken(): Promise<RefreshResponse> {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return {
      success: false,
      message: 'No refresh token found',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (response.ok && result.success && result.data) {
      // Update access token
      localStorage.setItem(TOKEN_KEY, result.data.token);
    }

    return result;
  } catch (error) {
    console.error('Token refresh error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to refresh token',
    };
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  const token = getToken();
  
  if (token) {
    try {
      // Call backend logout endpoint
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local cleanup even if API call fails
    }
  }

  // Clear all auth data
  clearAuth();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Get authorization header
 */
export function getAuthHeader(): { Authorization: string } | {} {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * API call with automatic token refresh
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  // Add auth header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Make request
  let response = await fetch(url, { ...options, headers });

  // If token expired, try to refresh
  if (response.status === 401) {
    const refreshResult = await refreshAccessToken();
    
    if (refreshResult.success) {
      // Retry with new token
      const newToken = getToken();
      const newHeaders = {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      };
      
      response = await fetch(url, { ...options, headers: newHeaders });
    } else {
      // Refresh failed, clear auth and throw
      clearAuth();
      throw new Error('Session expired. Please login again.');
    }
  }

  return response;
}
