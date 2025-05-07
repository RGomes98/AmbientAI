import { z } from 'zod';

const UserExampleSchema = z.object({ id: z.string().uuid(), name: z.string(), email: z.string().email() });
const ErrorExampleSchema = z.object({ message: z.string() });

type UserExample = z.infer<typeof UserExampleSchema>;
type ErrorExample = z.infer<typeof ErrorExampleSchema>;

export { UserExampleSchema, ErrorExampleSchema };
export type { UserExample, ErrorExample };
