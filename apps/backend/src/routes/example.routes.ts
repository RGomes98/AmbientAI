import type { UserExample } from '../lib/schemas/routes/example.schema';
import type { FastifyTypedInstance } from '../config/app.config';

import {
  ErrorExampleSchema,
  UserExampleDelete,
  UserExampleGetQuery,
  UserExampleSchema,
} from '../lib/schemas/routes/example.schema';

const USERS: UserExample[] = [];

export const example = async (instance: FastifyTypedInstance) => {
  instance.post(
    '/example/users',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'POST' endpoint",
        body: UserExampleSchema.omit({ id: true }),
        response: { 201: UserExampleSchema },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      const user = { id: crypto.randomUUID(), name, email };
      USERS.push(user);
      return reply.status(201).send(user);
    }
  );

  instance.get(
    '/example/users',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'GET' endpoint",
        querystring: UserExampleGetQuery,
        response: { 200: UserExampleSchema.array() },
      },
    },
    async (request, reply) => {
      const { search } = request.query;

      const result = search
        ? USERS.filter((user) => user.name.toLowerCase().includes(search.toLowerCase().trim()))
        : USERS;

      return reply.status(200).send(result);
    }
  );

  instance.patch(
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
    async (request, reply) => {
      const { id } = request.params;
      let index = USERS.findIndex((user) => id === user.id);

      if (index === -1) return reply.status(404).send({ message: 'User not found' });
      const user = USERS[index];

      USERS[index] = { ...user, ...request.body };
      return reply.status(204).send();
    }
  );

  instance.delete(
    '/example/users/:id',
    {
      schema: {
        tags: ['Example'],
        description: "Example 'DELETE' endpoint",
        params: UserExampleSchema.pick({ id: true }),
        response: {
          204: UserExampleDelete,
          404: ErrorExampleSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const index = USERS.findIndex((user) => id === user.id);
      if (index === -1) return reply.status(404).send({ message: 'User not found' });

      USERS.splice(index, 1);
      return reply.status(204).send();
    }
  );
};
