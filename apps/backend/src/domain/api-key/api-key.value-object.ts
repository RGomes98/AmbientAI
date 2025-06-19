import { ApiKeySchema, ApiKeyStructureSchema, ApiKeyHeadersSchema } from './api-key.schema';

export class ApiKeyValueObject {
  public static validate(key: unknown) {
    return ApiKeySchema.parse(key);
  }

  public static validateStructure(key: unknown) {
    return ApiKeyStructureSchema.parse(key);
  }
}
