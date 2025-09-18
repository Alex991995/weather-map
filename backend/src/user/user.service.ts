import { PrismaService } from '@/database/prisma.service.js';
import { UserDTO } from './dto/user.dto.js';
import bcrypt from 'bcryptjs';
import { User } from '@/generated/prisma/client.js';

const salt = process.env.SALT!;

export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(body: UserDTO) {
    const hashedPassword = bcrypt.hashSync(body.password, +salt);

    try {
      const result = await this.prismaService.client.user.create({
        data: { ...body, password: hashedPassword },
      });

      return result;
    } catch (error) {
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

  async updateUserStatus(user: User) {
    return await this.prismaService.client.user.update({
      where: {
        id: user.id,
      },
      data: { ...user, status: false },
    });
  }
}
