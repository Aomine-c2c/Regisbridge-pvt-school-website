export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: 'admin' | 'teacher' | 'student' | 'parent'
    grade?: string | null
    studentId?: string | null
    phoneNumber?: string | null
    status: string
    createdAt: Date
    updatedAt: Date
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    role: 'admin' | 'teacher' | 'student' | 'parent'
    grade?: string
    studentId?: string
    phoneNumber?: string
}

export interface AuthResponse {
    success: boolean
    message?: string
    user?: Omit<User, 'password'>
    accessToken?: string
    refreshToken?: string
}

export interface AuthContextType {
    user: Omit<User, 'password'> | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (data: RegisterRequest) => Promise<void>
    logout: () => void
    refreshAuth: () => Promise<void>
}
