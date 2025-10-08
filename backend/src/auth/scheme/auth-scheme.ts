import { z } from 'zod';


export const LoginSchema = z
  .object({
    email: z.email().min(4),
    password: z.string().min(4),
  })
  .required().strict();
