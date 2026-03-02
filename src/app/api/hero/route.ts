import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

const heroSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().min(2),
  ctaText: z.string().min(1),
  ctaUrl: z.string().url(),
  imageUrl: z.string().url().optional().or(z.literal(''))
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
    const hero = await prisma.heroContent.findFirst();
    if (!hero) {
      return NextResponse.json({
        success: true,
        data: {
          title: 'Launch your next idea faster',
          subtitle: 'A clean, responsive landing page ready to convert visitors into leads.',
          ctaText: 'Contact Us',
          ctaUrl: '#contact',
          imageUrl: ''
        }
      });
    }
    return NextResponse.json({ success: true, data: hero });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load hero content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = heroSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const created = await prisma.heroContent.create({ data: parsed.data });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create hero content' }, { status: 500 });
  }
}
