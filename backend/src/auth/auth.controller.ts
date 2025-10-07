import { Request, Response, NextFunction, Router } from 'express';

import { LoginDTO } from './dto/login.dto.js';
import { validateDTO } from '@/middlewares/validateDTO.middleware.js';
import { LoginSchema } from './auth-scheme/auth-scheme.js';
import { AuthService } from './auth.service.js';
import { HttpError } from '@/errors/http-error.js';

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
          // res.send({ access_token });
          res.cookie('access_token', access_token).send({ isAuthenticated: true });
          return;
        }

        next(new HttpError(401, 'Wrong credential'));
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
      console.log(token);
      const payload = await this.authService.verifyToken(token);
      res.send(payload);
    });

    return this.router;
  }
}
