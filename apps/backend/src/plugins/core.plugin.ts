import type { FastifyPluginCallback } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { fastifyCors } from '@fastify/cors';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export const core: FastifyPluginCallback = (app, _opts, done) => {
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

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  done();
};

Object.defineProperty(core, Symbol.for('skip-override'), { value: true });
