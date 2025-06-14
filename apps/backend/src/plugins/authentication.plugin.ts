import type { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { fastifyJwt } from '@fastify/jwt';

import { ENV } from '../env';

const plugin = (instance: FastifyInstance) => {
  instance.register(fastifyJwt, {
    secret: ENV.JWT_SECRET,
    sign: { expiresIn: '1d' },
  });
};

export const authentication = fastifyPlugin(plugin, { name: 'authentication-plugin' });
