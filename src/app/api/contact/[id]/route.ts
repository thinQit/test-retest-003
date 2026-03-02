import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getTokenFromHeader, verifyToken } from '@/lib/auth';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  message: z.string().min(10).optional()
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const message = await prisma.contactMessage.findUnique({ where: { id: params.id } });
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: message });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to load message' }, { status: 500 });
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

    const updated = await prisma.contactMessage.update({
      where: { id: params.id },
      data: parsed.data
    });

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.contactMessage.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
