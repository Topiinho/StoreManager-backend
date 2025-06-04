import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  const senha = await bcrypt.hash('senha123', saltRounds);

  await prisma.user.createMany({
    data: [
      {
        Login: 'admin',
        Password: senha,
        UserType: 'ADM',
      },
      {
        Login: 'basic',
        Password: senha,
        UserType: 'Basic',
      },
    ],
    skipDuplicates: true, // Não cria se já existir
  });

  console.log('Seed executada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });