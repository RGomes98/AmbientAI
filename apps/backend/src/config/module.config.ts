import type { FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyRateLimit } from '@fastify/rate-limit';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { ENV } from '../env';
import { z } from 'zod';
import { readFileContent } from '../utils/file.utils';
import { VersionSchema } from '../schemas/utils/file.schema';

type ModuleRegister = (instance: FastifyInstance) => void | Promise<void>;

const DEFAULT_MODULES = {
  CORS: (instance) => {
    instance.register(fastifyCors, {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    });
  },
} as const satisfies Record<string, ModuleRegister>;

const ENVIRONMENT_MODULES: Record<typeof ENV.NODE_ENV, ModuleRegister> = {
  test: () => {},

  development: (instance) => {
    const version = readFileContent('vercel.json', VersionSchema, (json) => json.env.VERSION);
    const changelog = readFileContent('CHANGELOG.md', z.string())?.split('\n').slice(6).join('\n');

    instance.register(fastifySwagger, {
      transform: jsonSchemaTransform,
      openapi: {
        info: {
          title: 'AmbientAI API',
          version: version ?? 'unknown',
          description: changelog ?? 'No changelog available.',
        },
      },
    });

    instance.register(fastifySwaggerUi, { routePrefix: '/docs' });
  },

  production: async (instance) => {
    await instance.register(fastifyRateLimit, {
      max: ENV.REQUESTS_PER_MINUTE,
      timeWindow: '1 minute',
      addHeaders: {
        'x-ratelimit-limit': true,
        'x-ratelimit-remaining': true,
        'x-ratelimit-reset': true,
      },
      errorResponseBuilder: (_request, context) => ({
        statusCode: 429,
        error: 'Too Many Requests',
        message: `Rate limit exceeded. Try again in ${context.after}`,
      }),
    });
  },
};

export { DEFAULT_MODULES, ENVIRONMENT_MODULES };
