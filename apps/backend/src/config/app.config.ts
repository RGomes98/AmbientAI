import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { fastify } from 'fastify';

import { core } from '../plugins/core.plugin';
import { swagger } from '../plugins/swagger.plugin';
import { authenticate } from '../plugins/authenticate.plugin';

import { handler } from '../lib/error/handler.error';
import { AuthGuard } from '../utils/auth.util';

// Create Fastify app with Zod support
export const app = fastify().withTypeProvider<ZodTypeProvider>();
export type FastifyTypedInstance = typeof app;

// Set Zod-based validator and serializer for Fastify
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

// Set Global Error Handler
app.setErrorHandler(handler);

// Register Plugins
app.register(core);
app.register(swagger);
app.register(authenticate);

// Register Decorators
app.decorate('authenticate', AuthGuard.verify);
app.decorate('requireRole', AuthGuard.requireRole);
