import { Role } from '@prisma/client';

import { Crypto } from '../../../utils/crypto.util';
import { ApiKeyFactory } from '../../../domain/api-key/api-key.factory';
import { prisma } from '../prisma.database';
import { UserValueObject } from '../../../domain/user/user.value-object';

async function seed() {
  console.info('🌱 Starting the device writer seeding process...');

  const email = UserValueObject.validateEmail(process.env.DEVICE_EMAIL);
  const password = UserValueObject.validatePassword(process.env.DEVICE_PASSWORD);

  const device = await prisma.user.create({
    data: {
      email: email,
      role: Role.DEVICE_WRITER,
      password: await Crypto.hashWithSalt(password),
    },
  });

  const { plainKey, hashedKey } = ApiKeyFactory.create();

  await prisma.apiKey.create({
    data: {
      hashedKey,
      userId: device.id,
    },
  });

  console.info(`✅ Device writer successfully created!`);
  console.info(`Username: ${email}`);
  console.info(`API Key (use on the device): ${plainKey}`);
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
