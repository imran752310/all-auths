// // 



// import { prisma } from '@/lib/db';
// import { comparePassword } from '@/utils/hash';
// import { createToken } from '@/utils/jwt';

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return new Response(JSON.stringify({ message: 'User not found' }), {
//         status: 401,
//       });
//     }

//     const isValid = await comparePassword(password, user.password);
//     if (!isValid) {
//       return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
//         status: 401,
//       });
//     }

//     const token = createToken({ id: user.id, email: user.email });

//     // Set cookie (remove Secure for localhost)
//     return new Response(
//       JSON.stringify({
//         message: 'Login successful',
//         token,
//       }),
//       {
//         status: 200,
//         headers: {
//           'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   } catch (error) {
//     console.error('🔥 Login route failed:', error);
//     return new Response(
//       JSON.stringify({ message: 'Internal server error' }),
//       { status: 500 }
//     );
//   }
// }


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
