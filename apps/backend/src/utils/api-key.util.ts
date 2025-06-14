import type { FastifyRequest } from 'fastify';

import type { DeviceHeader } from '../domain/api-key/api-key.types';
import { prisma } from '../lib/database/prisma.database';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyService } from '../services/api-key.service';
import { ApiKeySchema } from '../domain/api-key/api-key.schema';

const apiKeyRepository = new ApiKeyRepository(prisma);
const apiKeyService = new ApiKeyService(apiKeyRepository);

export class ApiKeyGuard {
  private static validate(key: unknown) {
    return ApiKeySchema.parse(key);
  }

  public static async authenticate(request: FastifyRequest<{ Headers: DeviceHeader }>) {
    const plainTextApiKey = ApiKeyGuard.validate(request.headers['x-api-key']);
    const sessionPayload = await apiKeyService.createSessionFromApiKey(plainTextApiKey);
    request.user = sessionPayload;
  }
}
