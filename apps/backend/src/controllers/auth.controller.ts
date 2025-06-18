import type { FastifyReply, FastifyRequest } from 'fastify';

import type { UserCreate, UserLogin } from '../domain/user/user.type';
import type { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private service: AuthService) {}

  public async register(request: FastifyRequest<{ Body: UserCreate }>, reply: FastifyReply) {
    const user = await this.service.createUser(request.body);
    return reply.status(201).send(user);
  }

  public async login(request: FastifyRequest<{ Body: UserLogin }>, reply: FastifyReply) {
    const { username: email, password } = request.body;
    const payload = await this.service.createTokenPayload({ email, password });
    const token = await reply.jwtSign(payload);
    return reply.status(200).send({ token_type: 'Bearer', access_token: token });
  }

  public async me(request: FastifyRequest, reply: FastifyReply) {
    const existingUser = await this.service.getAuthenticatedUser(request.user);
    return reply.status(200).send(existingUser);
  }
}
