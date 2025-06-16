import { createHash, randomBytes } from 'crypto';

import { API_KEY_PREFIX } from '../../constants/api-key.constant';

export class ApiKeyFactory {
  private static create() {
    const randomPart = randomBytes(24).toString('hex');
    return `${API_KEY_PREFIX}${randomPart}`;
  }

  public static hash(plain: string) {
    return createHash('sha256').update(plain).digest('hex');
  }

  public static generate() {
    const plainKey = ApiKeyFactory.create();

    return {
      plainKey,
      hashedKey: ApiKeyFactory.hash(plainKey),
    };
  }
}
