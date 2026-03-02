import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

const featureSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  icon: z.string().optional()
});

function isAdminRequest(request: NextRequest): boolean {
  const token = getTokenFromHeader(request.headers.get('authorization'));
  if (!token) return false;
  const adminToken = process.env.ADMIN_TOKEN;
  if (adminToken && token === adminToken) return true;
  try {
    const payload = verifyToken(token);
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const features = await prisma.feature.findMany();
    return NextResponse.json({ success: true, data: { features } });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load features' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = featureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const created = await prisma.feature.create({ data: parsed.data });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create feature' }, { status: 500 });
  }
}
