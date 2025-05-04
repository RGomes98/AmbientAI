import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().int(),
});
