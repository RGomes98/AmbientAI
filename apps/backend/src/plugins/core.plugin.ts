import type { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { fastifyCors } from '@fastify/cors';
import { fastifyRateLimit } from '@fastify/rate-limit';
import { fastifyFormbody } from '@fastify/formbody';

import { ENV } from '../env';

const plugin = async (instance: FastifyInstance) => {
  instance.register(fastifyFormbody);

  instance.register(fastifyCors, {
    origin: ENV.FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

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
};

export const core = fastifyPlugin(plugin, { name: 'core-plugin' });
