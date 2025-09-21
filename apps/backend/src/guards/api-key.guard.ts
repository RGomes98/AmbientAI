import type { FastifyRequest } from 'fastify';

import { ApiKeyValueObject } from '../domain/api-key/api-key.value-object';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyService } from '../services/api-key.service';
import { prisma } from '../lib/database/prisma.database';

const apiKeyRepository = new ApiKeyRepository(prisma);
const apiKeyService = new ApiKeyService(apiKeyRepository);

export class ApiKeyGuard {
  public static async verify(request: FastifyRequest) {
    const plainTextApiKey = ApiKeyValueObject.validateStructure(request.headers['x-api-key']);
    const session = await apiKeyService.createSessionFromApiKey(plainTextApiKey);
    request.user = session;
  }
}
