import { User } from '@/generated/prisma/client.js';

declare global {
  namespace Express {
    interface Request {
      user: User;
      token: string;
    }
  }
}
export interface IAccess_token {
  access_token: string;
}

export interface IPayload {
  email: string;
  iat: number;
  exp: number;
}
