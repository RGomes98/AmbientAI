import { Role } from '@prisma/client';

import { UserCreateSchema, UserLoginSchema, UserResponseSchema } from '../domain/user/user.schema';
import { TokenSchema } from '../domain/token/token.schema';
import { AuthGuard } from '../guards/auth.guard';

const registerValidator = {
  schema: {
    tags: ['Auth'],
    description: 'Registers a new user account.',
    consumes: ['application/json'],
    body: UserCreateSchema,
    response: { 201: UserResponseSchema },
  },
};

const loginValidator = {
  schema: {
    tags: ['Auth'],
    description: 'Logs in an existing user and returns an access token.',
    consumes: ['application/x-www-form-urlencoded'],
    body: UserLoginSchema,
    response: { 200: TokenSchema },
  },
};

const meValidator = {
  schema: {
    tags: ['Auth'],
    description: "Retrieves the authenticated user's account details.",
    security: [{ bearerAuth: [] }],
    response: { 200: UserResponseSchema },
  },
  onRequest: [AuthGuard.verify, AuthGuard.requireRole([Role.ADMIN, Role.DEVICE_WRITER, Role.VIEWER])],
};

export { registerValidator, loginValidator, meValidator };
