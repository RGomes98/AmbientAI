import { createHash, randomBytes } from 'crypto';

import { API_KEY_PREFIX } from './api-key.schema';

export class ApiKeyFactory {
  public static hashKey(plain: string) {
    return createHash('sha256').update(plain).digest('hex');
  }

  public static generateApiKey() {
    const randomPart = randomBytes(24).toString('hex');
    const plainKey = `${API_KEY_PREFIX}${randomPart}`;

    return {
      plainKey,
      hashedKey: ApiKeyFactory.hashKey(plainKey),
    };
  }
}
