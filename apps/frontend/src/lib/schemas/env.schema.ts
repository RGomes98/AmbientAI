import z from 'zod';

export const EnvSchema = z.object({
  SERVER_URL: z.url(),
});
