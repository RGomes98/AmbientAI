import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  REQUESTS_PER_MINUTE: z.coerce.number().int().positive(),
  POSTGRES_DATABASE_URL: z.coerce.string().url(),
  POSTGRES_DATABASE_URL_NON_POOLING: z.coerce.string().url(),
  JWT_SECRET: z.coerce.string().base64(),
  SALT_ROUNDS: z.coerce.number().int().positive(),
});
