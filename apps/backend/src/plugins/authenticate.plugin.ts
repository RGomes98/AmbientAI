import type { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { fastifyJwt } from '@fastify/jwt';

import { ENV } from '../env';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => ReturnType<FastifyRequest['jwtVerify']>;
  }
}

const plugin = (instance: FastifyInstance) => {
  instance.register(fastifyJwt, {
    secret: ENV.JWT_SECRET,
    sign: { expiresIn: '1d' },
  });
};

export const authenticate = fastifyPlugin(plugin, { name: 'authenticate-plugin' });
