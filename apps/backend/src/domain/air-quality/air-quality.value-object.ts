import { AirQualityCreateSchema, AirQualityQuerySchema } from './air-quality.schema';

export class AirQualityValueObject {
  public static validate(data: unknown) {
    return AirQualityCreateSchema.array().parse(data);
  }

  public static validateMock(data: unknown) {
    return AirQualityCreateSchema.omit({ timestamp: true }).array().parse(data);
  }

  public static validateQuery(query: unknown) {
    return AirQualityQuerySchema.parse(query);
  }
}
