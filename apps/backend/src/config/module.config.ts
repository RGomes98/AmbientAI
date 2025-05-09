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
    instance.register(fastifyCors, { origin: '*' });
  },
} as const satisfies Record<string, ModuleRegister>;

const ENVIRONMENT_MODULES: Record<typeof ENV.NODE_ENV, ModuleRegister> = {
  test: () => {},

  production: async (instance) => {
    await instance.register(fastifyRateLimit, {
      max: ENV.REQUESTS_PER_MINUTE,
      timeWindow: '1 minute',
    });
  },

  development: (instance) => {
    instance.register(fastifySwagger, {
      transform: jsonSchemaTransform,
      openapi: {
        info: {
          title: 'AmbientAI API',
          description: readFileContent('CHANGELOG.md', z.string())?.split('\n').slice(6).join('\n'),
          version: readFileContent('vercel.json', VersionSchema, (json) => json.env?.VERSION) ?? 'unknown',
        },
      },
    });

    instance.register(fastifySwaggerUi, { routePrefix: '/docs' });
  },
};

export { DEFAULT_MODULES, ENVIRONMENT_MODULES };
