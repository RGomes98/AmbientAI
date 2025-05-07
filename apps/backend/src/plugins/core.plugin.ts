import type { FastifyPluginAsync } from 'fastify';
import { DEFAULT_MODULES, ENVIRONMENT_MODULES } from '../config/module.config';
import { ENV } from '../env';

export const core: FastifyPluginAsync = async (instance) => {
  DEFAULT_MODULES['cors'](instance);
  ENVIRONMENT_MODULES[ENV.NODE_ENV](instance);
};

Object.defineProperty(core, Symbol.for('skip-override'), { value: true });
