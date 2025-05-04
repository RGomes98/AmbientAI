import type { FastifyPluginAsync } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastifyCors } from '@fastify/cors';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifyRateLimit } from '@fastify/rate-limit';
import { ENV } from '@/config/env.config';

export const core: FastifyPluginAsync = async (app, _opts) => {
  const isDevEnvironment = ENV.NODE_ENV === 'development';

  app.register(fastifyCors, {
    origin: '*',
  });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        version: '1.0.0',
        title: 'AmbientAI API',
        description: 'Documentation for the AmbientAI API.',
      },
    },
    transform: jsonSchemaTransform,
  });

  if (isDevEnvironment) {
    app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });
  }

  if (!isDevEnvironment) {
    await app.register(fastifyRateLimit, {
      max: ENV.REQUESTS_PER_MINUTE,
      timeWindow: '1 minute',
    });
  }
};

Object.defineProperty(core, Symbol.for('skip-override'), { value: true });
