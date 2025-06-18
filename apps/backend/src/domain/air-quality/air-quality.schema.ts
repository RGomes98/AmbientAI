import { z } from 'zod';

const AirQualitySchema = z.object({
  id: z.string().cuid(),
  timestamp: z.coerce.date(),
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

const AirQualityCreateSchema = AirQualitySchema.omit({
  id: true,
  timestamp: true,
});

const AirQualityQuerySchema = z.object({
  startTimestamp: AirQualitySchema.shape.timestamp.optional(),
  endTimestamp: AirQualitySchema.shape.timestamp.optional(),
  minTemperature: AirQualitySchema.shape.temperature.nullable().catch(null),
  maxTemperature: AirQualitySchema.shape.temperature.nullable().catch(null),
  airQuality: AirQualitySchema.shape.airQuality.optional(),
});

export { AirQualitySchema, AirQualityCreateSchema, AirQualityQuerySchema };
