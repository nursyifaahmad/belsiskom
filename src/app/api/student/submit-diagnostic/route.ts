import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDiagnosticQuestions } from '@/data/questions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, answers } = body; // answers: { [id]: 'A' | 'B' | ... }

    if (!studentId || !answers) {
      return NextResponse.json(
        { ok: false, message: 'ID murid dan jawaban asesmen diperlukan!' },
        { status: 400 }
      );
    }

    const diagnosticQuestions = getDiagnosticQuestions();
    let correctCount = 0;
    const answerDetails: Record<number, { selected: string; correct: string; isCorrect: boolean }> = {};

    diagnosticQuestions.forEach((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      answerDetails[q.id] = {
        selected: selected || '-',
        correct: q.correctAnswer,
        isCorrect,
      };
    });

    const totalQuestions = diagnosticQuestions.length;
    const score = parseFloat(((correctCount / totalQuestions) * 100).toFixed(1));

    // Save or update DiagnosticResult
    const result = await prisma.diagnosticResult.upsert({
      where: { studentId },
      create: {
        studentId,
        score,
        correctCount,
        totalQuestions,
        answersJson: JSON.stringify(answerDetails),
      },
      update: {
        score,
        correctCount,
        totalQuestions,
        answersJson: JSON.stringify(answerDetails),
        submittedAt: new Date(),
      },
    });

    // Advance student to LEARNING stage
    await prisma.student.update({
      where: { id: studentId },
      data: {
        status: 'LEARNING',
        currentStep: 1,
        lastActiveAt: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      score,
      correctCount,
      totalQuestions,
      answerDetails,
    });
  } catch (error: any) {
    console.error('Error submit diagnostic:', error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
