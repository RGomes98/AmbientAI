import { z } from 'zod';

import { AirQualitySchema, AirQualityCreateSchema, AirQualityQuerySchema } from './air-quality.schema';

type AirQuality = z.infer<typeof AirQualitySchema>;
type AirQualityCreate = z.infer<typeof AirQualityCreateSchema>;
type AirQualityQuery = z.infer<typeof AirQualityQuerySchema>;

export type { AirQuality, AirQualityCreate, AirQualityQuery };
