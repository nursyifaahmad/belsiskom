import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      studentId, 
      status, 
      currentLearningStep, 
      completedSteps, 
      pcSimulatorDone,
      validationQuizAnswers 
    } = body;

    if (!studentId) {
      return NextResponse.json({ ok: false, message: 'Student ID diperlukan' }, { status: 400 });
    }

    // Update student status & active time
    await prisma.student.update({
      where: { id: studentId },
      data: {
        status: status || undefined,
        currentStep: currentLearningStep || undefined,
        lastActiveAt: new Date(),
      },
    });

    // Upsert learning progress
    if (completedSteps || pcSimulatorDone !== undefined || validationQuizAnswers) {
      await prisma.learningProgress.upsert({
        where: { studentId },
        create: {
          studentId,
          completedStepsJson: JSON.stringify(completedSteps || []),
          simulationCompleted: !!pcSimulatorDone,
          simulationScore: pcSimulatorDone ? 100 : 0,
          quizValidationJson: JSON.stringify(validationQuizAnswers || {}),
        },
        update: {
          completedStepsJson: completedSteps ? JSON.stringify(completedSteps) : undefined,
          simulationCompleted: pcSimulatorDone !== undefined ? !!pcSimulatorDone : undefined,
          simulationScore: pcSimulatorDone ? 100 : undefined,
          quizValidationJson: validationQuizAnswers ? JSON.stringify(validationQuizAnswers) : undefined,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    // If student was deleted or invalid, don't crash
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
