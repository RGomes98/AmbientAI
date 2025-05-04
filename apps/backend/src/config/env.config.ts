import { EnvSchema } from '@/schemas/config/env.schema';

export const ENV = EnvSchema.parse(process.env);
