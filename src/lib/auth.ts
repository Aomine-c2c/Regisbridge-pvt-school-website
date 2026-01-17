import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

// Validate JWT_SECRET environment variable
const jwtSecretKey = process.env.JWT_SECRET
if (!jwtSecretKey) {
    throw new Error('JWT_SECRET environment variable is required. Generate with: openssl rand -base64 64')
}
if (jwtSecretKey.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long for security')
}
const JWT_SECRET = new TextEncoder().encode(jwtSecretKey)

// Validate JWT_REFRESH_SECRET environment variable
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET
if (!jwtRefreshSecretKey) {
    throw new Error('JWT_REFRESH_SECRET environment variable is required. Generate with: openssl rand -base64 64')
}
if (jwtRefreshSecretKey.length < 32) {
    throw new Error('JWT_REFRESH_SECRET must be at least 32 characters long for security')
}
const JWT_REFRESH_SECRET = new TextEncoder().encode(jwtRefreshSecretKey)

export interface JWTPayload {
    userId: string
    email: string
    role: string
    iat?: number
    exp?: number
}

// Generate access token (7 days)
export async function generateAccessToken(payload: JWTPayload): Promise<string> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET)

    return token
}

// Generate refresh token (30 days)
export async function generateRefreshToken(payload: JWTPayload): Promise<string> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(JWT_REFRESH_SECRET)

    return token
}

// Verify access token
export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload as JWTPayload
    } catch (error) {
        console.error('Token verification failed:', error)
        return null
    }
}

// Verify refresh token
export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET)
        return payload as JWTPayload
    } catch (error) {
        console.error('Refresh token verification failed:', error)
        return null
    }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

// Compare password
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}
