import type { UserRepository } from '../repositories/user.repository';
import type { UserCreate } from '../domain/user/user.type';
import { AuthenticationError, ConflictError, NotFoundError } from '../lib/error/http.error';
import { UserValueObject } from '../domain/user/user.value-object';
import { Crypto } from '../utils/crypto.util';

export class AuthService {
  constructor(private repository: UserRepository) {}

  public async createUser({ email, password }: UserCreate) {
    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new ConflictError('An account with this email already exists.');
    }

    return await this.repository.create({
      email,
      password: await Crypto.hashWithSalt(password),
    });
  }

  public async createTokenPayload({ email, password }: UserCreate) {
    const existingUser = await this.repository.findByEmail(email);

    if (!existingUser) {
      throw new AuthenticationError('Invalid email or password.');
    }

    const isPasswordCorrect = await Crypto.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      throw new AuthenticationError('Invalid email or password.');
    }

    const tokenPayload = {
      userId: existingUser.id,
      role: existingUser.role,
    };

    return tokenPayload;
  }

  public async getAuthenticatedUser(user: unknown) {
    const { userId } = UserValueObject.validateSession(user);

    const existingUser = await this.repository.findById(userId);

    if (!existingUser) {
      throw new NotFoundError('No account found for the provided user ID.');
    }

    return existingUser;
  }
}
