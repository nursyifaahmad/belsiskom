import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getPostTestQuestions } from '@/data/questions';
import { calculateNGain } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, answers } = body;

    if (!studentId || !answers) {
      return NextResponse.json(
        { ok: false, message: 'ID murid dan jawaban asesmen diperlukan!' },
        { status: 400 }
      );
    }

    const postTestQuestions = getPostTestQuestions();
    let correctCount = 0;
    const answerDetails: Record<number, { selected: string; correct: string; isCorrect: boolean }> = {};

    postTestQuestions.forEach((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;
      answerDetails[q.id] = {
        selected: selected || '-',
        correct: q.correctAnswer,
        isCorrect,
      };
    });

    const totalQuestions = postTestQuestions.length;
    const score = parseFloat(((correctCount / totalQuestions) * 100).toFixed(1));

    // Get diagnostic score for comparison and N-Gain
    const diag = await prisma.diagnosticResult.findUnique({
      where: { studentId },
    });
    const diagScore = diag ? diag.score : 0;
    const nGain = calculateNGain(diagScore, score);

    // Save or update PostTestResult
    const result = await prisma.postTestResult.upsert({
      where: { studentId },
      create: {
        studentId,
        score,
        correctCount,
        totalQuestions,
        answersJson: JSON.stringify(answerDetails),
        nGain,
      },
      update: {
        score,
        correctCount,
        totalQuestions,
        answersJson: JSON.stringify(answerDetails),
        nGain,
        submittedAt: new Date(),
      },
    });

    // Mark student as COMPLETED
    await prisma.student.update({
      where: { id: studentId },
      data: {
        status: 'COMPLETED',
        lastActiveAt: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      score,
      correctCount,
      totalQuestions,
      diagScore,
      nGain,
      answerDetails,
    });
  } catch (error: any) {
    console.error('Error submit post-test:', error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
