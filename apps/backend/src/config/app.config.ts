import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastify } from 'fastify';

export const app = fastify().withTypeProvider<ZodTypeProvider>();
export type FastifyTypedInstance = typeof app;
