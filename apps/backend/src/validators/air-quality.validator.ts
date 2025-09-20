import { Role } from '@prisma/client';

import { ApiKeyHeadersSchema } from '../domain/api-key/api-key.schema';
import { ApiKeyGuard } from '../guards/api-key.guard';
import { AuthGuard } from '../guards/auth.guard';

import {
  AirQualitySchema,
  AirQualityCreateSchema,
  AirQualityQuerySchema,
  AirQualityWeeklyComparisonSchema,
} from '../domain/air-quality/air-quality.schema';

const createValidator = {
  schema: {
    tags: ['Air Quality'],
    description: 'Endpoint to submit air quality data.',
    security: [{ bearerAuth: [] }],
    consumes: ['application/json'],
    headers: ApiKeyHeadersSchema,
    body: AirQualityCreateSchema.array(),
    response: { 201: AirQualitySchema.array() },
  },
  onRequest: [ApiKeyGuard.verify, AuthGuard.verify, AuthGuard.requireRole([Role.ADMIN, Role.DEVICE_WRITER])],
};

const latestValidator = {
  schema: {
    tags: ['Air Quality'],
    description: 'Endpoint to retrieve the latest air quality data.',
    security: [{ bearerAuth: [] }],
    response: { 200: AirQualitySchema.nullable() },
  },
  onRequest: [AuthGuard.verify, AuthGuard.requireRole([Role.ADMIN, Role.DEVICE_WRITER, Role.VIEWER])],
};

const filteredValidator = {
  schema: {
    tags: ['Air Quality'],
    description: 'Endpoint to retrieve filtered air quality data.',
    security: [{ bearerAuth: [] }],
    querystring: AirQualityQuerySchema,
    response: { 200: AirQualitySchema.array() },
  },
  onRequest: [AuthGuard.verify, AuthGuard.requireRole([Role.ADMIN, Role.DEVICE_WRITER, Role.VIEWER])],
};

const averageValidator = {
  schema: {
    tags: ['Air Quality'],
    description: 'Endpoint to retrieve air quality data averages.',
    security: [{ bearerAuth: [] }],
    response: { 200: AirQualityWeeklyComparisonSchema },
  },
  onRequest: [AuthGuard.verify, AuthGuard.requireRole([Role.ADMIN, Role.DEVICE_WRITER, Role.VIEWER])],
};

export { createValidator, latestValidator, filteredValidator, averageValidator };
