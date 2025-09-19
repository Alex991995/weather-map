import { PrismaService } from '@/database/prisma.service.js';
import { UserDTO } from './dto/user.dto.js';
import bcrypt from 'bcryptjs';
import { User } from '@/generated/prisma/client.js';

const salt = process.env.SALT!;

// {
//     "id": "cd59c25f-e4a3-4232-a2c0-0c4b40ea1e4b",
//     "firstName": "ALIAKSANDR",
//     "lastName": "KISEL",
//     "email": "sasheadmin.1995@gmail.com",
//     "is_admin": true,
// }

export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(body: UserDTO) {
    const hashedPassword = bcrypt.hashSync(body.password, +salt);
    try {
      const result = await this.prismaService.client.user.create({
        data: { ...body, password: hashedPassword },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          is_admin: true,
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllUsers() {
    return await this.prismaService.client.user.findMany();
  }

  async getUserByID(id: string) {
    return await this.prismaService.client.user.findUnique({
      where: {
        id,
      },
    });
  }
}
