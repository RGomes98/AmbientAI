import { z } from 'zod';

export const QueryParamSchema = z.string().trim().min(1);
export const DayRangeQueryParamSchema = z.enum(['1d', '7d', '14d']).catch('7d');
