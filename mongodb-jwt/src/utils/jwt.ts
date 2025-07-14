// import jwt from 'jsonwebtoken'; // ✅ This is required

// const SECRET = process.env.JWT_SECRET || 'dev_secret'; // ✅ Use fallback in dev

// export function createToken(payload: object) {
//   return jwt.sign(payload, SECRET, { expiresIn: '1d' });
// }

// export function verifyToken(token: string) {
//   return jwt.verify(token, SECRET); // throws error if invalid
// }

// src/utils/jwt-middleware.ts
// import { jwtVerify } from 'jose';

// const secret = new TextEncoder().encode('dev_secret'); // same secret used in your .env or jwt.ts

// export async function verifyJwtToken(token: string) {
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch (err) {
//     console.error("JWT verification failed in middleware:", err);
//     return null;
//   }
// }

// export function createToken(payload: object) {
//   return jwt.sign(payload, secret, { expiresIn: '1d' });
// }

// ✅ Still OK for server routes
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev_secret';

export function createToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET); // ❌ Do not use in middleware
}

