import { z } from 'zod';

export const CreateUserScheme = z
  .object({
    email: z.email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(4),
  })
  .required();
