import express, { type Express } from 'express';
import 'dotenv/config';
import { PrismaService } from './database/prisma.service.js';
import { UserController } from './user/user.controller.js';
import body from 'body-parser';
import { ExceptionFilter } from './errors/exception.filter.js';
import { AuthController } from './auth/auth.controller.js';
import { AuthMiddleware } from './middlewares/auth.middleware.js';
import { AuthService } from './auth/auth.service.js';

// Health check endpoint

export class App {
  app: Express;
  authService: AuthService;

  constructor(
    private prismaService: PrismaService,
    private userController: UserController,
    private exceptionFilter: ExceptionFilter,
    private authController: AuthController,
    private authMiddleware: AuthMiddleware,
    authService: AuthService,
  ) {
    this.app = express();
    this.authService = authService;
  }

  useMiddleware() {
    this.app.use(body.json());
    this.app.use(this.authMiddleware.execute.bind(this.authMiddleware));
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  useRoutes() {
    this.app.use('/user', this.userController.routes());
    this.app.use('/auth', this.authController.routes());
  }

  async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();

    await this.prismaService.connect();
    this.app.listen(3000);
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
  }
}
