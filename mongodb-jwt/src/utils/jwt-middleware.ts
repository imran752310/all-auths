// src/utils/jwt-middleware.ts
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('dev_secret'); // Use the same value as in your .env

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    console.error('❌ JWT verify failed in middleware:', error);
    return null;
  }
}
