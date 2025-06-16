import { AuthenticationError } from '../lib/error/http.error';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyFactory } from '../domain/api-key/api-key.factory';
import { Session } from '../utils/session.util';

export class ApiKeyService {
  constructor(private repository: ApiKeyRepository) {}

  public async createSessionFromApiKey(plainKey: string) {
    const hashedApiKey = ApiKeyFactory.hash(plainKey);
    const apiKeyRecord = await this.repository.findByHashedKey(hashedApiKey);

    if (!apiKeyRecord) {
      throw new AuthenticationError('Invalid API Key.');
    }

    const sessionPayload = {
      userId: apiKeyRecord.user.id,
      role: apiKeyRecord.user.role,
    };

    return Session.validate(sessionPayload);
  }
}
