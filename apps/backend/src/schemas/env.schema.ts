import { z } from 'zod';
import { VersionSchema } from './utils/file.schema';

export const EnvSchema = z.object({
  VERSION: VersionSchema.nullable().catch(null),
  PORT: z.coerce.number().int(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  REQUESTS_PER_MINUTE: z.coerce.number().int().positive(),
});
