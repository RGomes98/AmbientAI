import { UserSessionSchema } from './user.schema';

export class UserValueObject {
  public static validateSession(payload: unknown) {
    return UserSessionSchema.parse(payload);
  }
}
