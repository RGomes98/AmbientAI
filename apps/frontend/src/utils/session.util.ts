import { cookies } from 'next/headers';
import z from 'zod';

type TokenType = 'access_token' | 'refresh_token';

export class Session {
  public static async getAuthorizationToken(token: TokenType) {
    try {
      const cookie = await cookies();
      const value = cookie.get(token)?.value;
      return z.jwt().parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static generateAuthorizationHeaders(token: string) {
    return `Bearer ${token}` as const;
  }
}
