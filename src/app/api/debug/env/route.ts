import { NextResponse } from 'next/server';

export async function GET() {
  // This is for debugging - remove after testing
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    hasMainUser: !!process.env.ADMIN_USER_MAIN,
    hasMainPassword: !!process.env.ADMIN_PASSWORD_MAIN,
    hasDevUser: !!process.env.ADMIN_USER_DEV,
    hasDevPassword: !!process.env.ADMIN_PASSWORD_DEV,
    // Don't expose actual values for security
  });
}
