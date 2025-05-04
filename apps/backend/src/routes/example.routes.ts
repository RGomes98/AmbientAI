import type { FastifyTypedInstance } from '@/config/app.config';
import { z } from 'zod';

const UserExampleSchema = z.object({ id: z.string().uuid(), name: z.string(), email: z.string().email() });
const ErrorExampleSchema = z.object({ message: z.string() });

type UserExample = z.infer<typeof UserExampleSchema>;
type ErrorExample = z.infer<typeof ErrorExampleSchema>;

const USERS: UserExample[] = [];

export const example = async (app: FastifyTypedInstance) => {
  app.post(
    '/example/users',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'POST' endpoint",
        body: UserExampleSchema.omit({ id: true }),
        response: { 201: UserExampleSchema },
      },
    },
    async (request, response) => {
      const { name, email } = request.body;
      const user = { id: crypto.randomUUID(), name, email };
      USERS.push(user);
      return response.status(201).send(user);
    }
  );

  app.get(
    '/example/users',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'GET' endpoint",
        querystring: z.object({ search: z.string().optional() }),
        response: { 200: UserExampleSchema.array() },
      },
    },
    async (request, response) => {
      const { search } = request.query;

      const result = search
        ? USERS.filter((user) => user.name.toLowerCase().includes(search.toLowerCase().trim()))
        : USERS;

      return response.status(200).send(result);
    }
  );

  app.patch(
    '/example/users/:id',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'PATCH' endpoint",
        params: UserExampleSchema.pick({ id: true }),
        body: UserExampleSchema.omit({ id: true }).partial(),
        response: {
          204: UserExampleSchema,
          404: ErrorExampleSchema,
        },
      },
    },
    async (request, response) => {
      const { id } = request.params;
      let index = USERS.findIndex((user) => id === user.id);

      if (index === -1) return response.status(404).send({ message: 'User not found' });
      const user = USERS[index];

      USERS[index] = { ...user, ...request.body };
      return response.status(204).send();
    }
  );

  app.delete(
    '/example/users/:id',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'DELETE' endpoint",
        params: UserExampleSchema.pick({ id: true }),
        response: {
          204: z.void(),
          404: ErrorExampleSchema,
        },
      },
    },
    async (request, response) => {
      const { id } = request.params;

      const index = USERS.findIndex((user) => id === user.id);
      if (index === -1) return response.status(404).send({ message: 'User not found' });

      USERS.splice(index, 1);
      return response.status(204).send();
    }
  );
};
