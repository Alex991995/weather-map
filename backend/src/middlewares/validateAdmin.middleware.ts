import { HttpError } from '@/errors/http-error.js';
import type { Response, Request, NextFunction } from 'express';

export function validateAdmin() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (req.user.role === 'ADMIN') {
      next();
      return;
    }
    next(new HttpError(403, 'forbidden access'));
  };
}
