import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/auth-service";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  return {
    user: {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      permissions: payload.permissions || []
    }
  };
}
