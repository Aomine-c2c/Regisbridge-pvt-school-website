/**
 * Example: Using feature flags with your auth system
 * This shows how to integrate feature flags with authenticated users
 * 
 * NOTE: This is an example file showing the pattern.
 * To use it, copy the relevant code to src/lib/flags.ts
 */

import { statsigAdapter, type StatsigUser } from "@flags-sdk/statsig";
import { flag, dedupe } from "flags/next";
import type { Identify } from "flags";
import { cookies } from "next/headers";

/**
 * Example integration with auth system
 * Replace the identify function in src/lib/flags.ts with this pattern
 */
export const identifyWithAuth = dedupe((async () => {
  try {
    // Get token from cookies (await needed in Next.js 15)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return {
        userID: "anonymous",
      };
    }

    // Verify token and get user data
    const decoded = await verifyJWT(token);
    
    return {
      userID: decoded.id || "unknown",
      email: decoded.email,
      custom: {
        role: decoded.role,
        // Add any custom properties you want to use for targeting
        // These can be used in Statsig to create conditional rules
      }
    };
  } catch (error) {
    console.error("Error identifying user for feature flags:", error);
    return {
      userID: "anonymous",
    };
  }
}) satisfies Identify<StatsigUser>);

// Example helper to verify JWT token
async function verifyJWT(token: string) {
  // This is a placeholder - use your actual token verification logic
  // from src/lib/auth-middleware.ts
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const jwt = require("jsonwebtoken");
  const secret = process.env.JWT_SECRET || "fallback-secret-key";
  
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as { id: string; email: string; role: string };
  } catch (error) {
    throw new Error("Invalid token");
  }
}
