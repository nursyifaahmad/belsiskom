import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const expectedPassword = process.env.TEACHER_PASSWORD || 'guru123';

    if (password === expectedPassword) {
      const response = NextResponse.json({
        ok: true,
        teacher: {
          name: 'Ahmad Nursyifa, S.Kom.',
          role: 'Guru Informatika',
          school: 'SMP Negeri 2 Lemahabang',
        },
      });

      // Set cookie for simple teacher auth
      response.cookies.set('belsiskom_teacher_session', 'authenticated_ahmad_nursyifa', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json({ ok: false, message: 'Password salah!' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
}
