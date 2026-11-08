import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/session/check?code=XYZ or /api/session/check?class=7-A
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code')?.trim().toUpperCase();
    const targetClass = searchParams.get('class')?.trim();

    if (code) {
      const session = await prisma.learningSession.findUnique({
        where: { code },
      });

      if (!session) {
        return NextResponse.json({ ok: false, message: 'Kode sesi tidak ditemukan!' }, { status: 404 });
      }

      if (!session.isActive) {
        return NextResponse.json({ 
          ok: false, 
          isActive: false, 
          message: 'Sesi pembelajaran ini sedang ditutup oleh Pak Guru Ahmad Nursyifa.' 
        }, { status: 403 });
      }

      return NextResponse.json({ ok: true, session });
    }

    // Check if there is ANY active session
    let whereClause: any = { isActive: true };
    if (targetClass) {
      whereClause = {
        isActive: true,
        OR: [{ targetClass: 'ALL' }, { targetClass }],
      };
    }

    const activeSession = await prisma.learningSession.findFirst({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    if (!activeSession) {
      return NextResponse.json({ 
        ok: false, 
        isActive: false, 
        message: 'Belum ada sesi belajar yang dibuka oleh Pak Guru Ahmad Nursyifa. Silakan tunggu instruksi guru!' 
      }, { status: 403 });
    }

    return NextResponse.json({ ok: true, isActive: true, session: activeSession });
  } catch (error: any) {
    console.error('Error checking session:', error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
