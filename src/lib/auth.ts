import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { prisma } from './db';

type TokenPayload = {
  sub: string;
  role?: string;
};

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload) {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function signAccessToken(payload: TokenPayload) {
  return signToken(payload);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export function getTokenFromHeader(header?: string | null) {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

export function getBearerToken(header?: string | null) {
  return getTokenFromHeader(header);
}

export async function getAuthenticatedUser(token?: string | null) {
  if (!token) return null;
  let payload: JwtPayload | null = null;

  try {
    const decoded = verifyToken(token);
    payload = typeof decoded === 'string' ? null : (decoded as JwtPayload);
  } catch {
    return null;
  }

  const userId = payload?.sub;
  if (!userId || typeof userId !== 'string') return null;

  return prisma.user.findUnique({ where: { id: userId } });
}
