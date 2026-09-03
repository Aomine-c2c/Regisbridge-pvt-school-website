import { SignJWT, jwtVerify } from 'jose'


// Validate JWT_SECRET environment variable
const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.IS_BUILD === 'true' || process.env.npm_lifecycle_event === 'build';
const defaultBuildSecret = 'build_dummy_jwt_secret_must_be_at_least_64_characters_long_for_validation_123456789';

const jwtSecretKey = process.env.JWT_SECRET || (isBuild ? defaultBuildSecret : undefined);
if (!jwtSecretKey) {
    throw new Error('JWT_SECRET environment variable is required. Generate with: openssl rand -base64 64')
}
if (jwtSecretKey.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long for security')
}
const JWT_SECRET = new TextEncoder().encode(jwtSecretKey)

// Validate JWT_REFRESH_SECRET environment variable
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET || (isBuild ? defaultBuildSecret : undefined);
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
    permissions: string[] // RBAC Permissions
     // Optional for backward compatibility during migration
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
        return payload as unknown as JWTPayload
    } catch (error) {
        console.error('Token verification failed:', error)
        return null
    }
}

// Verify refresh token
export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET)
        return payload as unknown as JWTPayload
    } catch (error) {
        console.error('Refresh token verification failed:', error)
        return null
    }
}

