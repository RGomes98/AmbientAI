import { z } from 'zod';

import { Role } from '../../generated/prisma';

const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
});

const SessionSchema = z.object({
  userId: z.string().cuid(),
  role: z.nativeEnum(Role),
});

export { TokenSchema, SessionSchema };
