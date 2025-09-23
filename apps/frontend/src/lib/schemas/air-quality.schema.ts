import { z } from 'zod';

export const AirQualitySchema = z.object({
  id: z.cuid(),
  timestamp: z.coerce.date(),
  rco2: z.number(),
  tvocIndex: z.number(),
  tvocRaw: z.number(),
  noxIndex: z.number(),
  noxRaw: z.number(),
  pm01: z.number(),
  pm02: z.number(),
  pm10: z.number(),
  pm01Standard: z.number(),
  pm02Standard: z.number(),
  pm10Standard: z.number(),
  pm003Count: z.number(),
  pm005Count: z.number(),
  pm01Count: z.number(),
  pm02Count: z.number(),
  pm02Compensated: z.number(),
  atmp: z.number(),
  atmpCompensated: z.number(),
  rhum: z.number(),
  rhumCompensated: z.number(),
});

export const AirQualityWeeklyComparisonSchema = z.object({
  lastWeekAvg: AirQualitySchema.omit({ id: true, timestamp: true }),
  thisWeekAvg: AirQualitySchema.omit({ id: true, timestamp: true }),
});

export type AirQuality = z.infer<typeof AirQualitySchema>;
export type AirQualityWeeklyComparison = z.infer<typeof AirQualityWeeklyComparisonSchema>;
