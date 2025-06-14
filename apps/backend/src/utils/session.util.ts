import { SessionSchema } from '../domain/session/session.schema';

export class Session {
  public static validate(payload: unknown) {
    return SessionSchema.parse(payload);
  }
}
