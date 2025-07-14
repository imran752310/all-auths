// // // // import { NextRequest, NextResponse } from 'next/server';
// // // // import { verifyToken } from './utils/jwt';

// // // // export function middleware(req: NextRequest) {
// // // //   const token = req.cookies.get('token')?.value;

// // // //   if (!token) return NextResponse.redirect(new URL('/login', req.url));

// // // //   try {
// // // //     verifyToken(token);
// // // //     return NextResponse.next();
// // // //   } catch {
// // // //     return NextResponse.redirect(new URL('/login', req.url));
// // // //   }
// // // // }

// // // // export const config = {
// // // //   matcher: ['/dashboard/:path*'],
// // // // };


// // // // src/middleware.ts
// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { verifyToken } from './utils/jwt';

// // // export function middleware(req: NextRequest) {
// // //   const token = req.cookies.get('token')?.value;

// // //   if (!token) {
// // //     return NextResponse.redirect(new URL('/login', req.url));
// // //   }

// // //   try {
// // //     verifyToken(token); // Will throw error if invalid
// // //     return NextResponse.next();
// // //   } catch (error) {
// // //     console.error('JWT verify error:', error);
// // //     return NextResponse.redirect(new URL('/login', req.url));
// // //   }
// // // }

// // // export const config = {
// // //   matcher: ['/dashboard/:path*'],
// // // };


// // // src/middleware.ts
// // import { NextRequest, NextResponse } from 'next/server';
// // import { verifyToken } from './utils/jwt';

// // export function middleware(req: NextRequest) {
// //   const token = req.cookies.get('token')?.value;
// //   console.log("TOKEN in middleware:", token);

// //   if (!token) {
// //     console.log("🚫 No token found, redirecting to /login");
// //     return NextResponse.redirect(new URL('/login', req.url));
// //   }

// //   try {
// //     verifyToken(token); // Must not throw
// //     console.log("✅ Token is valid");
// //     return NextResponse.next();
// //   } catch (err) {
// //     console.log("❌ Invalid token:");
// //     return NextResponse.redirect(new URL('/login', req.url));
// //   }
// // }

// // export const config = {
// //   matcher: ['/dashboard/:path*'],
// // };


// // src/middleware.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { verifyToken } from './utils/jwt';

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;
//   console.log("TOKEN in middleware:", token);

//   if (!token) {
//     console.log("🚫 No token, redirecting to /login");
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   const payload = await verifyToken(token);

//   if (!payload) {
//     console.log("❌ Invalid token, redirecting to /login");
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   console.log("✅ Token valid, continuing to dashboard");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// };


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
