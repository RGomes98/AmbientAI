import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  REQUESTS_PER_MINUTE: z.coerce.number().int().positive(),
  POSTGRES_PORT: z.coerce.number().int().positive(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string().base64(),
  POSTGRES_DATABASE_URL: z.string().url(),
  POSTGRES_DATABASE_URL_NON_POOLING: z.string().url(),
  JWT_SECRET: z.string().base64(),
  SALT_ROUNDS: z.coerce.number().int().positive(),
  FRONTEND_URL: z.string().url(),
});
