import { z } from 'zod';

// Generic Schemas
const StringSchema = z.coerce.string();
const IntSchema = z.coerce.number().int();

// Environment Variables Schemas
const VersionSchema = StringSchema.regex(new RegExp(/^v?\d+\.\d+\.\d+$/));
const PortSchema = IntSchema.positive();
const NodeEnvSchema = z.enum(['production', 'development', 'test']);
const RequestsPerMinuteSchema = IntSchema.positive();
const PostgresDatabaseUrlSchema = StringSchema.url();
const PostgresDatabaseUrlNonPoolingSchema = StringSchema.url();
const JwtSecretSchema = StringSchema.base64();
const SaltRoundsSchema = IntSchema.positive();

export {
  StringSchema,
  VersionSchema,
  PortSchema,
  NodeEnvSchema,
  RequestsPerMinuteSchema,
  PostgresDatabaseUrlSchema,
  PostgresDatabaseUrlNonPoolingSchema,
  JwtSecretSchema,
  SaltRoundsSchema,
};
