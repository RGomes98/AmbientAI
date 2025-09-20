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
      throw new ConflictError('Já existe uma conta com este e-mail.');
    }

    return await this.repository.create({
      email,
      password: await Crypto.hashWithSalt(password),
    });
  }

  public async createTokenPayload({ email, password }: UserCreate) {
    const existingUser = await this.repository.findByEmail(email);

    if (!existingUser) {
      throw new AuthenticationError('E-mail ou senha inválidos.');
    }

    const isPasswordCorrect = await Crypto.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      throw new AuthenticationError('E-mail ou senha inválidos.');
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
      throw new NotFoundError('Nenhuma conta encontrada para o ID de usuário fornecido.');
    }

    return existingUser;
  }
}
