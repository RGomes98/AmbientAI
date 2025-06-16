import { ApiKeySchema } from '../../domain/api-key/api-key.schema';

export class ApiKey {
  public static validate(key: unknown) {
    return ApiKeySchema.parse(key);
  }
}
