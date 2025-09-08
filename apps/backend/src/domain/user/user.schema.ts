import { Role } from '@prisma/client';
import { z } from 'zod';

const PasswordSchema = z
  .string({ required_error: 'Password is required.' })
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' });

const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: PasswordSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.nativeEnum(Role),
});

const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
});

const UserResponseSchema = UserSchema.omit({
  password: true,
});

const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const UserSessionSchema = UserSchema.pick({
  role: true,
}).extend({ userId: UserSchema.shape.id });

export { UserSchema, UserCreateSchema, UserResponseSchema, UserLoginSchema, UserSessionSchema };
