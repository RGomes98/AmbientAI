import { UserCreate } from '../domain/user/user.types';
import { AuthenticationError, ConflictError, NotFoundError } from '../lib/error/http.error';
import { UserRepository } from '../repositories/user.repository';
import { Auth } from '../utils/auth/auth.util';
import { Session } from '../utils/session.util';

export class AuthService {
  constructor(private repository: UserRepository) {}

  public async createUser({ email, password }: UserCreate) {
    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new ConflictError('An account with this email already exists.');
    }

    return await this.repository.create({
      email,
      password: await Auth.hash(password),
    });
  }

  public async createTokenPayload({ email, password }: UserCreate) {
    const existingUser = await this.repository.findByEmail(email);

    if (!existingUser) {
      throw new AuthenticationError('Invalid email or password.');
    }

    const isPasswordCorrect = await Auth.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      throw new AuthenticationError('Invalid email or password.');
    }

    const tokenPayload = {
      userId: existingUser.id,
      role: existingUser.role,
    };

    return tokenPayload;
  }

  public async getAuthenticatedUser(user: Session) {
    const { userId } = Session.validate(user);

    const existingUser = await this.repository.findById(userId);

    if (!existingUser) {
      throw new NotFoundError('No account found for the provided user ID.');
    }

    return existingUser;
  }
}
