
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/utils/jwt-middleware'; // ✅ Correct one

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  console.log('TOKEN in middleware:', token);

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const payload = await verifyJwtToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('✅ Token valid — access granted');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
