import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all sessions
export async function GET() {
  try {
    const sessions = await prisma.learningSession.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { students: true },
        },
      },
    });

    return NextResponse.json({ ok: true, sessions });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}

// POST create new session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, targetClass, customCode } = body;

    const classPrefix = targetClass && targetClass !== 'ALL' ? targetClass.replace(/[^a-zA-Z0-9]/g, '') : 'ALL';
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const code = customCode ? customCode.trim().toUpperCase() : `BSK-${classPrefix}${randomSuffix}`;

    const newSession = await prisma.learningSession.create({
      data: {
        code,
        title: title || `Pembelajaran Sistem Komputer ${targetClass || 'Kelas 7'}`,
        targetClass: targetClass || 'ALL',
        isActive: true,
      },
    });

    return NextResponse.json({ ok: true, session: newSession });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}

// PATCH toggle active status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, isActive } = body;

    const updated = await prisma.learningSession.update({
      where: { id: sessionId },
      data: {
        isActive,
        closedAt: isActive ? null : new Date(),
      },
    });

    return NextResponse.json({ ok: true, session: updated });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
