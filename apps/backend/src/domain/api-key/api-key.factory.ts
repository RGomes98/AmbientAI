import { createHash, randomBytes } from 'crypto';

import { API_KEY_PREFIX } from './api-key.schema';

export class ApiKeyFactory {
  private static generatePlainKey() {
    const randomPart = randomBytes(24).toString('hex');
    return `${API_KEY_PREFIX}${randomPart}`;
  }

  public static hashKey(plain: string) {
    return createHash('sha256').update(plain).digest('hex');
  }

  public static generateApiKey() {
    const plainKey = ApiKeyFactory.generatePlainKey();

    return {
      plainKey,
      hashedKey: ApiKeyFactory.hashKey(plainKey),
    };
  }
}
