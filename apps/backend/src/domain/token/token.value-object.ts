import { TokenSchema } from './token.schema';

export class TokenValueObject {
  public static validate(token: unknown) {
    return TokenSchema.parse(token);
  }
}
