import { z } from 'zod';

import { API_KEY_PREFIX } from './api-key.const';

const ApiKeySchema = z.object({
  id: z.string().cuid(),
  hashedKey: z.string(),
  userId: z.string().cuid(),
  createdAt: z.coerce.date(),
});

const ApiKeyStructureSchema = z.string().startsWith(API_KEY_PREFIX, {
  message: "Invalid API Key format. Must start with 'ard_'.",
});

const ApiKeyHeadersSchema = z.object({
  'x-api-key': ApiKeyStructureSchema,
});

export { ApiKeySchema, ApiKeyStructureSchema, ApiKeyHeadersSchema };
