/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { isBrowser } from '@/lib/platform'
import { getItem, setItem, removeItem, getJSON, setJSON } from '@/lib/storage'

// Next.js API routes - use relative paths in production, localhost in dev
const API_BASE_URL = isBrowser()
  ? (window.location.hostname === 'localhost' ? 'http://localhost:3000' : '')
  : '';

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
  if (!isBrowser()) return
  try {
    setItem(TOKEN_KEY, token)
    setItem(REFRESH_TOKEN_KEY, refreshToken)
  } catch (e) {
    // ignore storage errors
  }
}

/**
 * Get access token
 */
export function getToken(): string | null {
  return getItem(TOKEN_KEY)
}

/**
 * Get refresh token
 */
export function getRefreshToken(): string | null {
  return getItem(REFRESH_TOKEN_KEY)
}

/**
 * Remove all authentication data
 */
export function clearAuth(): void {
  if (!isBrowser()) return
  try {
    removeItem(TOKEN_KEY)
    removeItem(REFRESH_TOKEN_KEY)
    removeItem(USER_KEY)
  } catch (e) {
    // ignore
  }
}

/**
 * Store user data
 */
export function setUser(user: User): void {
  if (!isBrowser()) return
  try {
    setJSON(USER_KEY, user)
  } catch (e) {
    // ignore
  }
}

/**
 * Get stored user data
 */
export function getUser(): User | null {
  return getJSON<User>(USER_KEY)
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
    const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
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
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (response.ok && result.success && result.data) {
      // Update access token
      setItem(TOKEN_KEY, result.data.token);
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
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
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
export function getAuthHeader(): { Authorization: string } | Record<string, never> {
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
