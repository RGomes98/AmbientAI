import type { FastifyRequest } from 'fastify';

export class Auth {
  public static async verify(request: FastifyRequest) {
    return await request.jwtVerify();
  }
}
