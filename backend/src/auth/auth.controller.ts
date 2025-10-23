import { Request, Response, NextFunction, Router } from 'express';

import { LoginDTO } from './dto/login.dto.js';
import { validateDTO } from '@/middlewares/validateDTO.middleware.js';
import { LoginSchema } from './scheme/auth-scheme.js';
import { AuthService } from './auth.service.js';
import { HttpError } from '@/errors/http-error.js';
import { RegisterDTO } from './dto/register.dto.js';
import { CreateUserScheme } from './scheme/register-scheme.js';

export class AuthController {
  router: Router;

  constructor(private authService: AuthService) {
    this.router = Router();
  }

  routes() {
    this.router.post(
      '/login',
      validateDTO(LoginSchema),
      async ({ body }: Request<object, object, LoginDTO>, res: Response, next: NextFunction) => {
        const access_token = await this.authService.loginUser(body);
        if (access_token) {
          res.cookie('access_token', access_token).send({ isAuthenticated: true });
          return;
        }

        next(new HttpError(401, 'Wrong credential'));
      },
    );

    this.router.post(
      '/create',
      validateDTO(CreateUserScheme),
      async (req: Request<object, object, RegisterDTO>, res: Response, next: NextFunction) => {
        const body = req.body;
        const loginCredentials: LoginDTO = {
          email: body.email,
          password: body.password,
        };
        const ISAdminExist = await this.authService.checkIfAdminExist();
        if (ISAdminExist && body.is_admin) {
          next(new HttpError(422, 'Admin already exists'));
        }
        const result = await this.authService.createUser(body);
        if (result) {
          const access_token = await this.authService.loginUser(loginCredentials);
          res.cookie('access_token', access_token).send({ isAuthenticated: true });
          return;
        } else {
          next(new HttpError(422, 'User already exists'));
        }
      },
    );

    this.router.get('/logout', async (req, res, next) => {
      res.clearCookie('access_token', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      res.status(200).json({ message: 'Logged out' });
    });

    this.router.get('/verify', async (req, res, next) => {
      const token = req.token;
      const payload = await this.authService.verifyToken(token);
      res.send(payload);
    });

    return this.router;
  }
}
