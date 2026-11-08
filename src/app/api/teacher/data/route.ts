import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { QUESTIONS } from '@/data/questions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const className = searchParams.get('className');

    // Build filter
    let studentWhere: any = {};
    if (sessionId) {
      studentWhere.sessionId = sessionId;
    }
    if (className && className !== 'ALL') {
      studentWhere.className = className;
    }

    // Fetch students with their results
    const students = await prisma.student.findMany({
      where: studentWhere,
      include: {
        session: true,
        diagnosticResult: true,
        postTestResult: true,
        learningProgress: true,
      },
      orderBy: [
        { className: 'asc' },
        { absentNo: 'asc' },
      ],
    });

    // Fetch all sessions for selection dropdown
    const sessions = await prisma.learningSession.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { students: true },
        },
      },
    });

    // Summary calculations
    const totalStudents = students.length;
    const diagCompleted = students.filter((s) => s.diagnosticResult).length;
    const postCompleted = students.filter((s) => s.postTestResult).length;

    let diagSum = 0;
    let postSum = 0;
    let nGainSum = 0;
    let nGainCount = 0;

    // Item analysis map: questionId -> { wrongCount, totalAttempted }
    const itemAnalysis: Record<number, { wrongCount: number; correctCount: number; category: string }> = {};
    QUESTIONS.forEach((q) => {
      itemAnalysis[q.id] = { wrongCount: 0, correctCount: 0, category: q.category };
    });

    students.forEach((s) => {
      if (s.diagnosticResult) {
        diagSum += s.diagnosticResult.score;
      }
      if (s.postTestResult) {
        postSum += s.postTestResult.score;
        nGainSum += s.postTestResult.nGain;
        nGainCount++;

        // Parse answersJson for item analysis
        try {
          const answers = JSON.parse(s.postTestResult.answersJson);
          Object.keys(answers).forEach((qIdStr) => {
            const qId = parseInt(qIdStr, 10);
            if (itemAnalysis[qId]) {
              if (answers[qId].isCorrect) {
                itemAnalysis[qId].correctCount++;
              } else {
                itemAnalysis[qId].wrongCount++;
              }
            }
          });
        } catch (e) {
          // ignore parsing error
        }
      }
    });

    const avgDiag = diagCompleted > 0 ? parseFloat((diagSum / diagCompleted).toFixed(1)) : 0;
    const avgPost = postCompleted > 0 ? parseFloat((postSum / postCompleted).toFixed(1)) : 0;
    const avgNGain = nGainCount > 0 ? parseFloat((nGainSum / nGainCount).toFixed(2)) : 0;

    return NextResponse.json({
      ok: true,
      sessions,
      students,
      stats: {
        totalStudents,
        diagCompleted,
        postCompleted,
        avgDiag,
        avgPost,
        avgNGain,
      },
      itemAnalysis,
    });
  } catch (error: any) {
    console.error('Error fetching teacher data:', error);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
