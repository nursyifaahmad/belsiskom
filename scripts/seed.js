const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('==> Inisialisasi akun guru BELSISKOM...');

  const teacher = await prisma.teacher.upsert({
    where: { username: 'ahmadnursyifa' },
    update: {
      name: 'Ahmad Nursyifa, S.Kom.',
      school: 'SMP Negeri 2 Lemahabang',
    },
    create: {
      username: 'ahmadnursyifa',
      password: process.env.TEACHER_PASSWORD || 'guru123',
      name: 'Ahmad Nursyifa, S.Kom.',
      school: 'SMP Negeri 2 Lemahabang',
    },
  });

  console.log(`==> Guru pengampu siap: ${teacher.name}`);

  const activeSession = await prisma.learningSession.findFirst({
    where: { isActive: true },
  });

  if (!activeSession) {
    const session = await prisma.learningSession.create({
      data: {
        code: 'BSK-7A1',
        title: 'Sesi Belajar Sistem Komputer Kelas 7-A',
        targetClass: '7-A',
        isActive: true,
        teacherId: teacher.id,
      },
    });
    console.log(`==> Sesi awal otomatis aktif: ${session.code} (${session.targetClass})`);
  }

  console.log('==> Inisialisasi basis data BELSISKOM selesai!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
