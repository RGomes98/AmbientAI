import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { fastify } from 'fastify';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

// Set Zod-based validator and serializer for Fastify
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

export type FastifyTypedInstance = typeof app;
