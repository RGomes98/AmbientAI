import { z } from 'zod';

export const AirQualitySchema = z.object({
  id: z.cuid(),
  timestamp: z.coerce.date(),
  temperature: z.number(),
  tempCompensated: z.number(),
  humidity: z.number(),
  humCompensated: z.number(),
  pm01: z.number(),
  pm02: z.number(),
  pm10: z.number(),
  pm003Count: z.number(),
  co2: z.number(),
  tvocIndex: z.number(),
  tvocRaw: z.number(),
  noxIndex: z.number(),
  noxRaw: z.number(),
});

export const AirQualityWeeklyComparisonSchema = z.object({
  lastWeekAvg: AirQualitySchema.omit({ id: true, timestamp: true }),
  thisWeekAvg: AirQualitySchema.omit({ id: true, timestamp: true }),
});

export type AirQuality = z.infer<typeof AirQualitySchema>;
export type AirQualityWeeklyComparison = z.infer<typeof AirQualityWeeklyComparisonSchema>;
