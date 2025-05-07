import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().int(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  REQUESTS_PER_MINUTE: z.coerce.number().int().positive(),
});
