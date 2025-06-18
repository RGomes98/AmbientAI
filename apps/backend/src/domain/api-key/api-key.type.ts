import { z } from 'zod';

import { ApiKeySchema, ApiKeyStructureSchema, ApiKeyHeadersSchema } from './api-key.schema';

type ApiKey = z.infer<typeof ApiKeySchema>;
type ApiKeyStructure = z.infer<typeof ApiKeyStructureSchema>;
type ApiKeyHeaders = z.infer<typeof ApiKeyHeadersSchema>;

export type { ApiKey, ApiKeyStructure, ApiKeyHeaders };
