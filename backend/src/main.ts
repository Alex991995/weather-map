import { App } from './app.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthService } from './auth/auth.service.js';
import { PrismaService } from './database/prisma.service.js';
import { ExceptionFilter } from './errors/exception.filter.js';
import { AuthMiddleware } from './middlewares/auth.middleware.js';
import { UserController } from './user/user.controller.js';
import { UserService } from './user/user.service.js';

async function bootstrap() {
  const prismaService = new PrismaService();
  const userService = new UserService(prismaService);
  const userController = new UserController(userService);
  const exceptionFilter = new ExceptionFilter();
  const authService = new AuthService(prismaService);
  const authController = new AuthController(authService);
  const authMiddleware = new AuthMiddleware(authService);

  const app = new App(
    prismaService,
    userController,
    exceptionFilter,
    authController,
    authMiddleware,
    authService,
  );

  await app.init();
}

bootstrap();
