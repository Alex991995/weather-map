import { Role } from '@/generated/prisma/index.js';

export interface UserDTO {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role?: Role;
}
