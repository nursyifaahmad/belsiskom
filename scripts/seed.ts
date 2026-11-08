import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data for BELSISKOM...');

  // 1. Create or update Teacher
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

  console.log('Teacher ready:', teacher.name);

  // 2. Create initial active session if none exists
  const existingSession = await prisma.learningSession.findFirst({
    where: { isActive: true },
  });

  if (!existingSession) {
    const session = await prisma.learningSession.create({
      data: {
        code: 'BSK-7A1',
        title: 'Sesi Perdana: Mengenal Sistem Komputer Kelas 7-A',
        targetClass: '7-A',
        isActive: true,
        teacherId: teacher.id,
      },
    });
    console.log('Active session created:', session.code, session.title);
  } else {
    console.log('Active session already exists:', existingSession.code);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
