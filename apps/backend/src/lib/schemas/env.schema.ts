import { z } from 'zod';

import {
  JwtSecretSchema,
  NodeEnvSchema,
  PortSchema,
  PostgresDatabaseUrlNonPoolingSchema,
  PostgresDatabaseUrlSchema,
  RequestsPerMinuteSchema,
  SaltRoundsSchema,
  VersionSchema,
} from './generic.schema';

export const EnvSchema = z.object({
  VERSION: VersionSchema.nullable().catch(null),
  PORT: PortSchema,
  NODE_ENV: NodeEnvSchema,
  REQUESTS_PER_MINUTE: RequestsPerMinuteSchema,
  POSTGRES_DATABASE_URL: PostgresDatabaseUrlSchema,
  POSTGRES_DATABASE_URL_NON_POOLING: PostgresDatabaseUrlNonPoolingSchema,
  JWT_SECRET: JwtSecretSchema,
  SALT_ROUNDS: SaltRoundsSchema,
});
