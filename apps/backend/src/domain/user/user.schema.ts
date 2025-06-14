import { z } from 'zod';

const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/);

const UserSchema = z.object({
  id: z.string().cuid(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  email: z.string().email({ message: 'invalid' }),
  password: z.string().regex(PASSWORD_REGEX),
});

const UserCreateSchema = UserSchema.pick({ email: true, password: true });
const UserLoginSchema = UserSchema.pick({ password: true }).extend({ username: z.string().email() });

export { UserSchema, UserCreateSchema, UserLoginSchema };
