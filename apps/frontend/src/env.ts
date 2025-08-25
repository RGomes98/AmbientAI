import { EnvSchema } from './lib/schemas/env.schema';

export const ENV = EnvSchema.parse(process.env);
