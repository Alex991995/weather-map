import { HttpError } from '@/errors/http-error.js';
import type { Response, Request, NextFunction } from 'express';

export function validateAdminOrUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (req.user.role === 'ADMIN') {
      next();
      return;
    } else if (id === req.user.id) {
      next();
      return;
    }
    next(new HttpError(403, 'forbidden access'));
  };
}
