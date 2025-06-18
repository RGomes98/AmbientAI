import type { ApiKeyRepository } from '../repositories/api-key.repository';
import { UserValueObject } from '../domain/user/user.value-object';
import { AuthenticationError } from '../lib/error/http.error';
import { Crypto } from '../utils/crypto.util';

export class ApiKeyService {
  constructor(private repository: ApiKeyRepository) {}

  public async createSessionFromApiKey(plainKey: string) {
    const hashedApiKey = Crypto.sha256Hash(plainKey);
    const apiKeyRecord = await this.repository.findByHashedKey(hashedApiKey);

    if (!apiKeyRecord) {
      throw new AuthenticationError('Invalid API Key.');
    }

    const sessionPayload = {
      userId: apiKeyRecord.user.id,
      role: apiKeyRecord.user.role,
    };

    return UserValueObject.validateSession(sessionPayload);
  }
}
