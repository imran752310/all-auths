// src/lib/auth.ts

import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}
