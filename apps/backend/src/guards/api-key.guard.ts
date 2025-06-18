import type { FastifyRequest } from 'fastify';

import type { ApiKeyHeaders } from '../domain/api-key/api-key.type';
import { ApiKeyValueObject } from '../domain/api-key/api-key.value-object';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyService } from '../services/api-key.service';
import { prisma } from '../lib/database/prisma.database';

const apiKeyRepository = new ApiKeyRepository(prisma);
const apiKeyService = new ApiKeyService(apiKeyRepository);

export class ApiKeyGuard {
  public static async verify(request: FastifyRequest<{ Headers: ApiKeyHeaders }>) {
    const plainTextApiKey = ApiKeyValueObject.validateStructure(request.headers['x-api-key']);
    const sessionPayload = await apiKeyService.createSessionFromApiKey(plainTextApiKey);
    request.user = sessionPayload;
  }
}
