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
          res.send({ access_token });
          return;
        }
        next(new HttpError(401, 'Wrong credential'));
      },
    );

    return this.router;
  }
}
