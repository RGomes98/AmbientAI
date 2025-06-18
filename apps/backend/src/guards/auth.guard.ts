import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Role } from '@prisma/client';

import { AuthenticationError, AuthorizationError } from '../lib/error/http.error';
import { UserValueObject } from '../domain/user/user.value-object';

export class AuthGuard {
  public static async verify(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (error) {
      console.error(error);
      throw new AuthenticationError();
    }
  }

  public static requireRole(allowedRoles: Role[]) {
    return async (request: FastifyRequest) => {
      const { role } = UserValueObject.validateSession(request.user);
      if (!allowedRoles.includes(role)) throw new AuthorizationError();
    };
  }
}
