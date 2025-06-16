import { Role } from '@prisma/client';
import { z } from 'zod';

const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.enum(['Bearer']),
});

const SessionSchema = z.object({
  userId: z.string().cuid(),
  role: z.nativeEnum(Role),
});

export { TokenSchema, SessionSchema };
