import { createHash, randomBytes } from 'crypto';
import { hash, compare } from 'bcryptjs';

import { ENV } from '../env';

export class Crypto {
  public static async hashWithSalt(plain: string) {
    return hash(plain, ENV.SALT_ROUNDS);
  }

  public static async compare(plain: string, hash: string) {
    return compare(plain, hash);
  }

  public static generateRandomHex(bytes = 24) {
    return randomBytes(bytes).toString('hex');
  }

  public static sha256Hash(plain: string) {
    return createHash('sha256').update(plain).digest('hex');
  }
}
