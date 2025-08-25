import { z } from 'zod';

export const QueryParamSchema = z.string().trim().min(1);
