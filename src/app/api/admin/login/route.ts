import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, AUTH_COOKIE_CONFIG } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    const isValid = await validateCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create response with authentication cookie
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
    // Set secure authentication cookie
    response.cookies.set(
      AUTH_COOKIE_CONFIG.name,
      AUTH_COOKIE_CONFIG.value,
      AUTH_COOKIE_CONFIG.options
    );

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  // Logout endpoint - clear the authentication cookie
  const response = NextResponse.json(
    { success: true, message: 'Logout successful' },
    { status: 200 }
  );

  response.cookies.set(AUTH_COOKIE_CONFIG.name, '', {
    ...AUTH_COOKIE_CONFIG.options,
    maxAge: 0, // Expire immediately
  });

  return response;
}
