import { DeviceHeaderSchema } from '../domain/api-key/api-key.schema';
import { ApiKeyGuard } from '../utils/api-key.util';
import { AuthGuard } from '../utils/auth.util';
import { Role } from '../generated/prisma';

const deviceData = {
  schema: {
    tags: ['Device'],
    description: 'Endpoint for devices to submit data.',
    consumes: ['application/json'],
    headers: DeviceHeaderSchema,
  },
  onRequest: [ApiKeyGuard.authenticate, AuthGuard.requireRole([Role.DEVICE_WRITER])],
};

export { deviceData };
