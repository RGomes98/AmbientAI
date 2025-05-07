import type { FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { fastifyRateLimit } from '@fastify/rate-limit';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { readFileContent, readPackageVersion } from '../utils/file.utils';
import { ENV } from '../env';

type ModuleRegister = (instance: FastifyInstance) => void | Promise<void>;

const DEFAULT_MODULES = {
  cors: (instance) => {
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
          version: readPackageVersion() ?? 'unknown',
          description: readFileContent('../../CHANGELOG.md')?.split('\n').slice(6).join('\n'),
        },
      },
    });

    instance.register(fastifySwaggerUi, { routePrefix: '/docs' });
  },
};

export { DEFAULT_MODULES, ENVIRONMENT_MODULES };
