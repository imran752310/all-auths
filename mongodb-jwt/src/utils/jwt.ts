
// ✅ Still OK for server routes
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev_secret';

export function createToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET); // ❌ Do not use in middleware
}

