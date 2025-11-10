/**
 * Secure Environment Configuration
 * 
 * Validates and provides access to critical environment variables.
 * Throws errors in production if required secrets are missing.
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

/**
 * Get required environment variable with validation
 * @param key - Environment variable name
 * @param fallback - Optional fallback for development/test only
 * @returns Environment variable value
 * @throws Error if variable is missing in production
 */
function getRequiredEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  
  if (!value) {
    // During build phase, use fallback to allow build to complete
    if (isBuild) {
      console.warn(
        `⚠️  WARNING: ${key} not set during build. ` +
        `Make sure to set this in your deployment environment.`
      );
      return fallback || 'build-time-placeholder';
    }
    
    // In production, missing required env vars are CRITICAL errors
    if (!isDevelopment && !isTest) {
      throw new Error(
        `CRITICAL: Missing required environment variable: ${key}. ` +
        `Set this in your deployment environment (Vercel Dashboard, etc.)`
      );
    }
    
    // In development/test, use fallback if provided
    if (fallback && (isDevelopment || isTest)) {
      console.warn(
        `⚠️  WARNING: Using fallback value for ${key}. ` +
        `Set a real value in .env.local for production-like behavior.`
      );
      return fallback;
    }
    
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

/**
 * Get optional environment variable
 * @param key - Environment variable name
 * @param defaultValue - Default value if not set
 * @returns Environment variable value or default
 */
function getOptionalEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}

// Export validated environment configuration
export const config = {
  // Critical security keys (required in production)
  jwt: {
    secret: getRequiredEnv(
      'JWT_SECRET',
      isDevelopment || isTest ? 'dev-secret-key-change-in-production' : undefined
    ),
    refreshSecret: getRequiredEnv(
      'JWT_REFRESH_SECRET',
      isDevelopment || isTest ? 'dev-refresh-secret-change-in-production' : undefined
    ),
    accessTokenExpiry: '7d',
    refreshTokenExpiry: '30d',
  },
  
  // Database (required in production)
  database: {
    url: getRequiredEnv(
      'DATABASE_URL',
      isDevelopment || isTest ? 'postgresql://localhost:5432/regisbridge_dev' : undefined
    ),
  },
  
  // External services (optional)
  sendgrid: {
    apiKey: getOptionalEnv('SENDGRID_API_KEY'),
    enabled: !!process.env.SENDGRID_API_KEY,
  },
  
  statsig: {
    sdkKey: getOptionalEnv('STATSIG_SDK_KEY'),
    enabled: !!process.env.STATSIG_SDK_KEY,
  },
  
  // Application settings
  app: {
    env: process.env.NODE_ENV || 'development',
    isDevelopment,
    isProduction: process.env.NODE_ENV === 'production',
    isTest,
    url: getOptionalEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    apiUrl: getOptionalEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api'),
  },
  
  // Security settings
  security: {
    bcryptRounds: 10,
    rateLimitWindow: 15 * 60 * 1000, // 15 minutes
    rateLimitMaxRequests: 10,
    sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
} as const;

// Validate critical configuration on startup
if (!isDevelopment && !isTest) {
  console.log('✅ Environment configuration validated successfully');
  console.log(`🚀 Running in ${config.app.env} mode`);
  console.log(`🔒 Security features enabled: JWT auth, bcrypt hashing`);
  
  if (!config.sendgrid.enabled) {
    console.warn('⚠️  SendGrid not configured - email features will be disabled');
  }
  
  if (!config.statsig.enabled) {
    console.warn('⚠️  Statsig not configured - feature flags will use defaults');
  }
}

export default config;
