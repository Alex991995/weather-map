import { Request, Response, NextFunction } from 'express';
import { HttpError } from './http-error.js';
import { CustomZodError } from './zod-error.js';
import * as z from 'zod/v4';

export class ExceptionFilter {
  constructor() {}
  catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).send(err.message);
    } else if (err instanceof z.ZodError) {
      const pretty = z.prettifyError(err);
      res.status(400).send({ message: pretty });
    } else {
      res.status(500).send(err.message);
    }
  }
}
