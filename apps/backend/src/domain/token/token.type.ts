import { z } from 'zod';

import { TokenSchema } from './token.schema';

export type Token = z.infer<typeof TokenSchema>;
