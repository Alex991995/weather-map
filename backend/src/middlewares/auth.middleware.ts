import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/errors/http-error.js';
import { AuthService } from '@/auth/auth.service.js';

export class AuthMiddleware {
  constructor(private authService: AuthService) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token as string | undefined;
    const route = req.originalUrl;

    if (token) {
      try {
        const payload = await this.authService.verifyToken(token);
        const user = await this.authService.findUser(payload.email);
        if (user) {
          req.user = user;
          req.token = token;
        }
        next();
      } catch (error) {
        next(new HttpError(401, 'invalid token'));
      }
    } else {
      if (route === '/user/create' || route === '/auth/login' || route === '/auth/verify') {
        return next();
      } else {
        next(new HttpError(403, 'forbidden access'));
      }
    }
  }
}
