import { z } from 'zod';

import { ApiKeySchema, DeviceHeaderSchema } from './api-key.schema';

type ApiKey = z.infer<typeof ApiKeySchema>;
type DeviceHeader = z.infer<typeof DeviceHeaderSchema>;

export type { ApiKey, DeviceHeader };
