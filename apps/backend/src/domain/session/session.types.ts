import { z } from 'zod';

import { SessionSchema, TokenSchema } from './session.schema';

type Session = z.infer<typeof SessionSchema>;
type TokenPayload = z.infer<typeof TokenSchema>;

export type { Session, TokenPayload };
