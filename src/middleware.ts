import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for non-admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }
//TWK
  // For other admin routes, check authentication
  const authCookie = request.cookies.get('admin-auth');
  const isAuthenticated = authCookie?.value === 'authenticated';
  
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};

/*
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to static files and login page
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml");

  const isLoginPage = pathname === "/admin/login";

  // Only protect /admin routes (excluding /admin/login)
  const isProtectedAdminRoute =
    pathname.startsWith("/admin") && !isLoginPage;

  if (isStaticAsset || isLoginPage) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("admin-auth");

  if (isProtectedAdminRoute && (!cookie || cookie.value === "")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
*/