import { PrismaClient } from '@prisma/client';
import { ENV } from '../../env';

declare global {
  var prisma: ReturnType<typeof prismaSingleton>;
}

const prismaSingleton = () => new PrismaClient({ datasourceUrl: ENV.POSTGRES_DATABASE_URL });

export const prisma = globalThis.prisma ?? prismaSingleton();
if (ENV.NODE_ENV !== 'production') globalThis.prisma = prisma;
