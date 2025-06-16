import { UserCreateSchema, UserLoginSchema, UserSchema } from '../domain/user/user.schema';
import { TokenSchema } from '../domain/session/session.schema';
import { AuthGuard } from '../utils/auth/auth.guard';

const registerValidator = {
  schema: {
    tags: ['Auth'],
    description: 'Registers a new user account.',
    consumes: ['application/json'],
    body: UserCreateSchema,
    response: { 201: UserSchema.omit({ password: true }) },
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
    response: { 200: UserSchema.omit({ password: true }) },
  },
  onRequest: [AuthGuard.verify],
};

export { registerValidator, loginValidator, meValidator };
