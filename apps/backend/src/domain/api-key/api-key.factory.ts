import { API_KEY_PREFIX } from './api-key.const';
import { Crypto } from '../../utils/crypto.util';

export class ApiKeyFactory {
  private static build() {
    const randomHex = Crypto.generateRandomHex();
    return `${API_KEY_PREFIX}${randomHex}`;
  }

  public static create() {
    const plainKey = this.build();

    return {
      plainKey,
      hashedKey: Crypto.sha256Hash(plainKey),
    };
  }
}
