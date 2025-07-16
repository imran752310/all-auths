// import { createToken } from '@/utils/jwt'; // your function
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   // validate user here...
//   const token = createToken( email );
// console.log("my token is : ",token)
//   const response = NextResponse.json({ message: 'Login success', token });

//   // ✅ Secure, HttpOnly cookie
//   response.cookies.set('token', token, {
//     httpOnly: true,
//     secure: true,
//     path: '/',
//     sameSite: 'lax',
//     maxAge: 60 * 60 * 24, // 1 day
//   });

//   return response;
// }



import { prisma } from '@/lib/db';
import { comparePassword } from '@/utils/hash';
import { createToken } from '@/utils/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1. Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response('User not found', { status: 401 });

  // 2. Check password match
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return new Response('Invalid credentials', { status: 401 });

  // 3. Create JWT token
  const token = createToken({ id: user.id, email: user.email });

  // 4. Return token in HttpOnly cookie and filtered user
  const response = Response.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });

  response.headers.set(
    'Set-Cookie',
    `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
  );

  return response;
}
