import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionCode, name, absentNo, className, deviceToken } = body;

    if (!name || !absentNo || !className) {
      return NextResponse.json(
        { ok: false, message: 'Nama lengkap, no absen, dan kelas wajib diisi!' },
        { status: 400 }
      );
    }

    // 1. Verify session
    let session = null;
    if (sessionCode) {
      session = await prisma.learningSession.findUnique({
        where: { code: sessionCode.trim().toUpperCase() },
      });
    } else {
      // Find latest active session for this class or ALL
      session = await prisma.learningSession.findFirst({
        where: {
          isActive: true,
          OR: [{ targetClass: 'ALL' }, { targetClass: className }],
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!session) {
      return NextResponse.json(
        { ok: false, message: 'Tidak ditemukan sesi pembelajaran yang aktif untuk kelas ini!' },
        { status: 404 }
      );
    }

    if (!session.isActive) {
      return NextResponse.json(
        { ok: false, message: 'Sesi pembelajaran ini sudah ditutup oleh Pak Guru Ahmad Nursyifa.' },
        { status: 403 }
      );
    }

    // Validate if session is locked to a specific class
    if (session.targetClass !== 'ALL' && session.targetClass !== className) {
      return NextResponse.json(
        { 
          ok: false, 
          message: `Sesi ${session.code} hanya dibuka untuk kelas ${session.targetClass}, bukan ${className}.` 
        },
        { status: 400 }
      );
    }

    const absentNumber = parseInt(absentNo.toString(), 10);

    // 2. Find or create student (recover previous state if exists)
    const existingStudent = await prisma.student.findUnique({
      where: {
        sessionId_className_absentNo: {
          sessionId: session.id,
          className,
          absentNo: absentNumber,
        },
      },
      include: {
        diagnosticResult: true,
        learningProgress: true,
        postTestResult: true,
      },
    });

    if (existingStudent) {
      // Update device token & last active
      const updated = await prisma.student.update({
        where: { id: existingStudent.id },
        data: {
          name, // update name in case of typo fix
          deviceToken,
          lastActiveAt: new Date(),
        },
        include: {
          diagnosticResult: true,
          learningProgress: true,
          postTestResult: true,
        },
      });

      return NextResponse.json({
        ok: true,
        isExisting: true,
        student: updated,
        session,
      });
    }

    // Create new student
    const student = await prisma.student.create({
      data: {
        sessionId: session.id,
        name: name.trim(),
        absentNo: absentNumber,
        className,
        deviceToken,
        status: 'DIAGNOSTIC',
      },
      include: {
        diagnosticResult: true,
        learningProgress: true,
        postTestResult: true,
      },
    });

    return NextResponse.json({
      ok: true,
      isExisting: false,
      student,
      session,
    });
  } catch (error: any) {
    console.error('Error student register:', error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
