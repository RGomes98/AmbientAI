import type { FastifyReply, FastifyRequest } from 'fastify';

import type { UserCreate, UserLogin } from '../domain/user/user.types';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private service: AuthService) {}

  public async register(request: FastifyRequest<{ Body: UserCreate }>, reply: FastifyReply) {
    const { email, password } = request.body;
    const user = await this.service.createUser({ email, password });
    return reply.status(201).send(user);
  }

  public async login(request: FastifyRequest<{ Body: UserLogin }>, reply: FastifyReply) {
    const { username: email, password } = request.body;
    const payload = await this.service.createTokenPayload({ email, password });
    const token = await reply.jwtSign(payload);
    return reply.status(200).send({ token_type: 'Bearer', access_token: token });
  }

  public async me(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request;
    const existingUser = await this.service.getAuthenticatedUser(user);
    return reply.status(200).send(existingUser);
  }
}
