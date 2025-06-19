import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';

import { HttpException } from './http.error';

export const handler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  console.error(`[Error Handler] ${request.method} ${request.url}`);
  console.error(`[Stack]`, error.stack);

  if (error instanceof PrismaClientKnownRequestError) {
    console.error(`[Prisma] Database error: ${error.message}`);
    return reply.status(500).send({ message: `${error.name} (${error.code})` });
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    console.error(`[Fastify/Zod] Request format error: ${error.code}`);
    return reply.status(400).send({ message: error.message });
  }

  if (error instanceof ZodError) {
    console.error(`[Zod] Validation error: ${error.name}`);
    return reply.status(400).send({ message: error.format()._errors });
  }

  if (error instanceof HttpException) {
    console.error(`[HttpException] ${error.name}: ${error.message}`);
    return reply.status(error.statusCode).send({ message: error.message });
  }

  console.error(`[Unhandled Error] Unexpected error: ${error.name}`);
  return reply.status(error.statusCode ?? 500).send({ message: error.message });
};
