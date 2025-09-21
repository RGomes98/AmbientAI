import type { FastifyTypedInstance } from '../config/app.config';
import { meValidator, loginValidator } from '../validators/auth.validator';
import { UserRepository } from '../repositories/user.repository';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { prisma } from '../lib/database/prisma.database';

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export const auth = async (instance: FastifyTypedInstance) => {
  // instance.post('/auth/register', registerValidator, authController.register.bind(authController));
  instance.post('/auth/login', loginValidator, authController.login.bind(authController));
  instance.get('/auth/me', meValidator, authController.me.bind(authController));
};
