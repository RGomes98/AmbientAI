import type { FastifyTypedInstance } from '../config/app.config';
import { prisma } from '../lib/database/prisma.database';
import { UserRepository } from '../repositories/user.repository';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { meValidation, loginValidation, registerValidation } from '../validators/auth.validator';

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

export const auth = async (instance: FastifyTypedInstance) => {
  instance.post('/auth/register', registerValidation, authController.register.bind(authController));
  instance.post('/auth/login', loginValidation, authController.login.bind(authController));
  instance.get('/auth/me', meValidation, authController.me.bind(authController));
};
