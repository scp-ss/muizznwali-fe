import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export interface AdminCredentials {
  username: string;
  password: string;
}

// Get admin credentials based on environment (server-side only)
export async function getAdminCredentials(): Promise<AdminCredentials> {
  // Try production env vars first, then fall back to dev
  const username = process.env.ADMIN_USER_MAIN || process.env.ADMIN_USER_DEV || 'Muizz Nasir';
  const password = process.env.ADMIN_PASSWORD_MAIN || process.env.ADMIN_PASSWORD_DEV || 'MuizzNasir123&rt';
  
  // Debug logging (will be visible in Vercel function logs)
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    hasMainUser: !!process.env.ADMIN_USER_MAIN,
    hasMainPassword: !!process.env.ADMIN_PASSWORD_MAIN,
    hasDevUser: !!process.env.ADMIN_USER_DEV,
    hasDevPassword: !!process.env.ADMIN_PASSWORD_DEV,
  });
  
  return {
    username,
    password,
  };
}

// Validate admin credentials (server-side only)
export async function validateCredentials(username: string, password: string): Promise<boolean> {
  const { username: validUsername, password: validPassword } = await getAdminCredentials();
  return username === validUsername && password === validPassword;
}

// Check if user is authenticated (server-side)
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin-auth');
    return authCookie?.value === 'authenticated';
  } catch {
    return false;
  }
}

// Check if user is authenticated (middleware/client-side)
export function isAuthenticatedFromRequest(request: NextRequest): boolean {
  const authCookie = request.cookies.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

// Cookie configuration
export const AUTH_COOKIE_CONFIG = {
  name: 'admin-auth',
  value: 'authenticated',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  },
};
