import type { FastifyRequest } from 'fastify';

import type { DeviceHeader } from '../../domain/api-key/api-key.types';
import { ApiKeyRepository } from '../../repositories/api-key.repository';
import { ApiKeyService } from '../../services/api-key.service';
import { prisma } from '../../lib/database/prisma.database';
import { ApiKey } from './api-key.util';

const apiKeyRepository = new ApiKeyRepository(prisma);
const apiKeyService = new ApiKeyService(apiKeyRepository);

export class ApiKeyGuard {
  public static async verify(request: FastifyRequest<{ Headers: DeviceHeader }>) {
    const plainTextApiKey = ApiKey.validate(request.headers['x-api-key']);
    const sessionPayload = await apiKeyService.createSessionFromApiKey(plainTextApiKey);
    request.user = sessionPayload;
  }
}
