import type { FastifyInstance } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifyPlugin } from 'fastify-plugin';

import { StringSchema } from '../lib/schemas/generic.schema';
import { File } from '../utils/file.util';
import { ENV } from '../env';

const plugin = async (instance: FastifyInstance) => {
  if (ENV.NODE_ENV === 'production') return;

  const version = File.readContent('VERSION', StringSchema);
  const changelog = File.readContent('CHANGELOG.md', StringSchema)?.split('\n').slice(6).join('\n');

  instance.register(fastifySwagger, {
    transform: jsonSchemaTransform,
    openapi: {
      info: {
        title: 'AmbientAI API',
        version: version ?? 'unknown',
        description: changelog ?? 'No changelog available.',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'oauth2',
            flows: { password: { scopes: {}, tokenUrl: '/auth/login' } },
          },
        },
      },
    },
  });

  instance.register(fastifySwaggerUi, { routePrefix: '/docs' });
};

export const swagger = fastifyPlugin(plugin, { name: 'swagger-plugin' });
