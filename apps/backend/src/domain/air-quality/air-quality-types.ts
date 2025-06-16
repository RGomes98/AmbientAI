import { z } from 'zod';

import { AirQualitySchema } from './air-quality.schema';

export type AirQuality = z.infer<typeof AirQualitySchema>;
