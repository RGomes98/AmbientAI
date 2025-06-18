import { z } from 'zod';

export const TokenSchema = z.object({
  access_token: z.string().jwt(),
  token_type: z.enum(['Bearer']),
});
