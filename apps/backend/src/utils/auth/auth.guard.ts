import type { FastifyRequest } from 'fastify';
import type { Role } from '@prisma/client';

import { AuthenticationError, AuthorizationError } from '../../lib/error/http.error';
import { Session } from '../session.util';

export class AuthGuard {
  public static async verify(request: FastifyRequest) {
    try {
      return await request.jwtVerify();
    } catch (err) {
      throw new AuthenticationError();
    }
  }

  public static requireRole(allowedRoles: Role[]) {
    return async (request: FastifyRequest) => {
      const { role } = Session.validate(request.user);
      if (!allowedRoles.includes(role)) throw new AuthorizationError();
    };
  }
}
