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
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: PasswordSchema,
});

const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
});

const UserLoginSchema = UserSchema.pick({
  password: true,
}).extend({ username: UserSchema.shape.email });

export { UserSchema, UserCreateSchema, UserLoginSchema, PasswordSchema };
