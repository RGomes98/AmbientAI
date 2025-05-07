import { z } from 'zod';

const UserExampleSchema = z.object({ id: z.string().uuid(), name: z.string(), email: z.string().email() });
const ErrorExampleSchema = z.object({ message: z.string() });
const UserExampleGetQuery = z.object({ search: z.string().optional() });
const UserExampleDelete = z.void();

type UserExample = z.infer<typeof UserExampleSchema>;
type ErrorExample = z.infer<typeof ErrorExampleSchema>;

export { UserExampleSchema, ErrorExampleSchema, UserExampleGetQuery, UserExampleDelete };
export type { UserExample, ErrorExample };
