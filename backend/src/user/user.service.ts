import { PrismaService } from '@/database/prisma.service.js';
// import { UserDTO } from './dto/user.dto.js';
// import bcrypt from 'bcryptjs';
// import { User } from '@/generated/prisma/client.js';

// const salt = process.env.SALT!;

export class UserService {
  constructor(private prismaService: PrismaService) {}

  // async createUser(body: UserDTO) {
  //   const hashedPassword = bcrypt.hashSync(body.password, +salt);
  //   try {
  //     const result = await this.prismaService.client.user.create({
  //       data: { ...body, password: hashedPassword },
  //       select: {
  //         id: true,
  //         firstName: true,
  //         lastName: true,
  //         email: true,
  //         is_admin: true,
  //       },
  //     });

  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // checkIfAdminExist() {
  //   return this.prismaService.client.user.findFirst({
  //     where: { is_admin: true },
  //   });
  // }

  async addFavoriteCity(userId: string, id_city: number) {
    try {
      const res = await this.prismaService.client.iDFavoriteCity.create({
        data: { id_city, userId },
      });
      return true;
    } catch (error) {
      const res = await this.prismaService.client.iDFavoriteCity.delete({
        where: {
          userId_id_city: {
            id_city,
            userId,
          },
        },
      });
      return false;
    }
  }
  getAllFavCityIDUser(userId: string) {
    return this.prismaService.client.user.findUnique({
      where: { id: userId },
      select: {
        favoriteCities: true,
        is_admin: true,
      },
    });
  }

  getPopularIDCityByAdmin() {
    return this.prismaService.client.user.findFirst({
      where: { is_admin: true },
      select: {
        favoriteCities: true,
      },
    });
  }

  setDefaultCity(userId: string, defaultCityName: string) {
    return this.prismaService.client.user.update({
      where: { id: userId },
      data: { defaultCityName: defaultCityName },
    });
  }

  // async getAllUsers() {
  //   return await this.prismaService.client.user.findMany();
  // }

  getUserByID(id: string) {
    return this.prismaService.client.user.findUnique({
      where: {
        id,
      },
      select: {
        defaultCityName: true,
        email: true,
        firstName: true,
        id: true,
        is_admin: true,
        lastName: true,
      },
    });
  }
}
