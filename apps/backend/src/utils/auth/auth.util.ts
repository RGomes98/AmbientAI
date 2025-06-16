import { hash, compare } from 'bcryptjs';

import { ENV } from '../../env';

export class Auth {
  public static async hash(plain: string) {
    return hash(plain, ENV.SALT_ROUNDS);
  }

  public static async compare(plain: string, hash: string) {
    return compare(plain, hash);
  }
}
