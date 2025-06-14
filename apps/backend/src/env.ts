import { EnvSchema } from './schemas/env.schema';

export const ENV = EnvSchema.parse(process.env);
