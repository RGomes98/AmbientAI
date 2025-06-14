import { z } from 'zod';

import { UserCreateSchema, UserLoginSchema, UserSchema } from './user.schema';

type User = z.infer<typeof UserSchema>;
type UserCreate = z.infer<typeof UserCreateSchema>;
type UserLogin = z.infer<typeof UserLoginSchema>;

export type { User, UserCreate, UserLogin };
