import { z } from 'zod';

import { API_KEY_PREFIX } from '../../constants/api-key.constant';

const ApiKeySchema = z.string().startsWith(API_KEY_PREFIX, {
  message: "Invalid API Key format. Must start with 'ard_'.",
});

const DeviceHeaderSchema = z.object({
  'x-api-key': ApiKeySchema,
});

export { ApiKeySchema, DeviceHeaderSchema };
