import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Secret, SignOptions } from 'jsonwebtoken';

const jwtSecret: Secret = process.env.JWT_SECRET || 'dev-secret';

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: Record<string, unknown>): string {
  const options: SignOptions = { expiresIn: '7d' };
  return jwt.sign(payload, jwtSecret, options);
}

export function verifyToken(token: string): unknown {
  return jwt.verify(token, jwtSecret);
}

export function getTokenFromHeader(header: string | null): string | null {
  if (!header) return null;
  const [type, token] = header.split(' ');
  if (type?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}
