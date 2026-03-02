import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

function isAdminRequest(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('authorization'));
  if (!token) return false;
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken && token === adminToken) return true;
  try {
    const payload = verifyToken(token);
    if (typeof payload === 'string' || !('role' in payload)) {
      return false;
    }
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const message = await prisma.contactMessage.create({ data: parsed.data });
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to submit message' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pageParam = Number(searchParams.get('page') || '1');
    const limitParam = Number(searchParams.get('limit') || '10');
    const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 100) : 10;
    const search = searchParams.get('search') || '';

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { m
... [truncated]
