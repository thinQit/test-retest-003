import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';
import type { JwtPayload } from 'jsonwebtoken';

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  subtitle: z.string().min(2).optional(),
  ctaText: z.string().min(1).optional(),
  ctaUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional().or(z.literal(''))
});

function isAdminRequest(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('authorization'));
  if (!token) return false;
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken && token === adminToken) return true;
  try {
    const payload = verifyToken(token);
    if (typeof payload === 'string') return false;
    return (payload as JwtPayload).role === 'admin';
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hero = await prisma.heroContent.findUnique({ where: { id: params.id } });
    if (!hero) {
      return NextResponse.json({ success: false, error: 'Hero content not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: hero });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load hero content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success || Object.keys(parsed.data).length === 0) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const updated = await prisma.heroContent.update({
      where: { id: params.id },
      data: parsed.data
    });

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update hero content' }, { status: 500 });
  }
}
