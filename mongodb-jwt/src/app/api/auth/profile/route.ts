import { NextResponse } from 'next/server';
import { createToken } from '@/utils/jwt';
import { prisma } from '@/lib/db';
import { compare } from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const isMatch = await compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = createToken({ id: user.id, email: user.email });

  const res = NextResponse.json({ message: 'Logged in successfully' });

  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
