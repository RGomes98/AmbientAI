import { ENV } from '../../env';
import { PrismaClient } from '../../generated/prisma';

declare global {
  var prisma: ReturnType<typeof prismaSingleton>;
}

const prismaSingleton = () => new PrismaClient();

export const prisma = globalThis.prisma ?? prismaSingleton();
if (ENV.NODE_ENV !== 'production') globalThis.prisma = prisma;
