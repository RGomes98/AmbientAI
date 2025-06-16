import { Role } from '@prisma/client';

import { DeviceHeaderSchema } from '../domain/api-key/api-key.schema';
import { ApiKeyGuard } from '../utils/api-key/api-key.guard';
import { AuthGuard } from '../utils/auth/auth.guard';

const deviceValidator = {
  schema: {
    tags: ['Device'],
    description: 'Endpoint for devices to submit data.',
    consumes: ['application/json'],
    headers: DeviceHeaderSchema,
  },
  onRequest: [ApiKeyGuard.verify, AuthGuard.requireRole([Role.DEVICE_WRITER])],
};

export { deviceValidator };
