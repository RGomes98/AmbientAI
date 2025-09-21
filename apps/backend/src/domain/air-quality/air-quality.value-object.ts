import { AirQualityCreateSchema, AirQualityQuerySchema } from './air-quality.schema';

export class AirQualityValueObject {
  public static validate(query: unknown) {
    return AirQualityCreateSchema.array().parse(query);
  }

  public static validateQuery(query: unknown) {
    return AirQualityQuerySchema.parse(query);
  }
}
