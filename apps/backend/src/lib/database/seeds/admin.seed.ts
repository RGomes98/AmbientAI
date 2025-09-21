import { Role } from '@prisma/client';

import { UserValueObject } from '../../../domain/user/user.value-object';
import { Crypto } from '../../../utils/crypto.util';
import { prisma } from '../prisma.database';

async function seed() {
  console.info('🌱 Starting the admin user seeding process...');

  const email = UserValueObject.validateEmail(process.env.ADMIN_EMAIL);
  const password = UserValueObject.validatePassword(process.env.ADMIN_PASSWORD);

  const admin = await prisma.user.create({
    data: {
      role: Role.ADMIN,
      email: email,
      password: await Crypto.hashWithSalt(password),
    },
  });

  console.info(`✅ Admin user successfully created! ${admin.email}`);
}

(async () => {
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
