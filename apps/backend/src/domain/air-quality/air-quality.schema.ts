import { z } from 'zod';

const AirQualitySchema = z.object({
  id: z.string().cuid(),
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

const AirQualityCreateSchema = AirQualitySchema.omit({ id: true });

const AirQualityQuerySchema = z.object({
  take: z.coerce.number().int().min(1).max(200).optional(),
  startTimestamp: AirQualitySchema.shape.timestamp.optional(),
  endTimestamp: AirQualitySchema.shape.timestamp.optional(),
  minTemperature: AirQualitySchema.shape.atmpCompensated.nullable().catch(null),
  maxTemperature: AirQualitySchema.shape.atmpCompensated.nullable().catch(null),
});

const AirQualityWeeklyComparisonSchema = z.object({
  lastWeekAvg: AirQualitySchema.omit({ id: true, timestamp: true }),
  thisWeekAvg: AirQualitySchema.omit({ id: true, timestamp: true }),
});

export { AirQualitySchema, AirQualityCreateSchema, AirQualityQuerySchema, AirQualityWeeklyComparisonSchema };
