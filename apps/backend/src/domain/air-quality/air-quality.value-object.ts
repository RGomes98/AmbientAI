import { AirQualityQuerySchema } from './air-quality.schema';

export class AirQualityValueObject {
  public static validateQuery(query: unknown) {
    return AirQualityQuerySchema.parse(query);
  }
}
