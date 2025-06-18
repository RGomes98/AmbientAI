import { z } from 'zod';

import {
  UserCreateSchema,
  UserLoginSchema,
  UserResponseSchema,
  UserSchema,
  UserSessionSchema,
} from './user.schema';

type User = z.infer<typeof UserSchema>;
type UserCreate = z.infer<typeof UserCreateSchema>;
type UserResponse = z.infer<typeof UserResponseSchema>;
type UserLogin = z.infer<typeof UserLoginSchema>;
type UserSession = z.infer<typeof UserSessionSchema>;

export type { User, UserCreate, UserResponse, UserLogin, UserSession };
