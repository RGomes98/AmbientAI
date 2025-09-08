import { z } from 'zod';

export const AirQualitySchema = z.object({
  id: z.cuid(),
  timestamp: z.string(),
  temperature: z.coerce.number(),
  humidity: z.number(),
  pm25: z.number(),
  pm10: z.number(),
  no2: z.number(),
  so2: z.number(),
  co: z.number(),
  proximityToIndustrialAreas: z.number(),
  populationDensity: z.number().int(),
  airQuality: z.enum(['Good', 'Moderate', 'Poor', 'Hazardous']),
});

export type AirQuality = z.infer<typeof AirQualitySchema>;
