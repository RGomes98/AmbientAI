import type { FastifyPluginAsync } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastifyCors } from '@fastify/cors';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifyRateLimit } from '@fastify/rate-limit';
import { ENV } from '../config/env.config';
import { readFileContent } from '../utils/readFileContent.util';

export const core: FastifyPluginAsync = async (app, _opts) => {
  app.register(fastifyCors, {
    origin: '*',
  });

  if (ENV.NODE_ENV === 'development') {
    app.register(fastifySwagger, {
      transform: jsonSchemaTransform,
      openapi: {
        info: {
          title: 'AmbientAI API',
          version: readFileContent('../../VERSION') ?? 'unknown',
          description: readFileContent('../../CHANGELOG.md')?.split('\n').slice(6).join('\n'),
        },
      },
    });

    app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });
  }

  if (ENV.NODE_ENV === 'production') {
    await app.register(fastifyRateLimit, {
      max: ENV.REQUESTS_PER_MINUTE,
      timeWindow: '1 minute',
    });
  }
};

Object.defineProperty(core, Symbol.for('skip-override'), { value: true });
