import { app } from '../config/app.config';
import { UserCreateSchema, UserLoginSchema, UserSchema } from '../domain/user/user.schema';
import { TokenSchema } from '../domain/session/session.schema';

const registerValidation = {
  schema: {
    tags: ['Auth'],
    description: 'Registers a new user account.',
    consumes: ['application/json'],
    body: UserCreateSchema,
    response: { 201: UserSchema.omit({ password: true }) },
  },
};

const loginValidation = {
  schema: {
    tags: ['Auth'],
    description: 'Logs in an existing user and returns an access token.',
    consumes: ['application/x-www-form-urlencoded'],
    body: UserLoginSchema,
    response: { 200: TokenSchema },
  },
};

const meValidation = {
  onRequest: [app.authenticate],
  schema: {
    tags: ['Auth'],
    description: "Retrieves the authenticated user's account details.",
    security: [{ bearerAuth: [] }],
    response: { 200: UserSchema.omit({ password: true }) },
  },
};

export { registerValidation, loginValidation, meValidation };
