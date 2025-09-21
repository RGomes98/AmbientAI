import { UserSchema, UserSessionSchema } from './user.schema';

export class UserValueObject {
  public static validateSession(payload: unknown) {
    return UserSessionSchema.parse(payload);
  }

  public static validateEmail(email: unknown) {
    return UserSchema.shape.email.parse(email);
  }

  public static validatePassword(password: unknown) {
    return UserSchema.shape.password.parse(password);
  }
}
