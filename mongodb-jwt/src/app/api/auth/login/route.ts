import { createToken } from '@/utils/jwt'; // your function
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // validate user here...
  const token = createToken({ email });

  const response = NextResponse.json({ message: 'Login success', token });

  // ✅ Secure, HttpOnly cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
