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

const AirQualityAverageSchema = z.object({
  rco2: z.number().nullable(),
  tvocIndex: z.number().nullable(),
  tvocRaw: z.number().nullable(),
  noxIndex: z.number().nullable(),
  noxRaw: z.number().nullable(),
  pm01: z.number().nullable(),
  pm02: z.number().nullable(),
  pm10: z.number().nullable(),
  pm01Standard: z.number().nullable(),
  pm02Standard: z.number().nullable(),
  pm10Standard: z.number().nullable(),
  pm003Count: z.number().nullable(),
  pm005Count: z.number().nullable(),
  pm01Count: z.number().nullable(),
  pm02Count: z.number().nullable(),
  pm02Compensated: z.number().nullable(),
  atmp: z.number().nullable(),
  atmpCompensated: z.number().nullable(),
  rhum: z.number().nullable(),
  rhumCompensated: z.number().nullable(),
});

export const AirQualityWeeklyComparisonSchema = z.object({
  lastWeekAvg: AirQualityAverageSchema,
  thisWeekAvg: AirQualityAverageSchema,
});

export type AirQuality = z.infer<typeof AirQualitySchema>;
export type AirQualityWeeklyComparison = z.infer<typeof AirQualityWeeklyComparisonSchema>;
