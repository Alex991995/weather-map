import { PrismaService } from '@/database/prisma.service.js';
import { IPayload } from '@/interface/index.js';
import jwt from 'jsonwebtoken';
import { LoginDTO } from './dto/login.dto.js';
import { compare } from 'bcryptjs';
import bcrypt from 'bcryptjs';
import { RegisterDTO } from './dto/register.dto.js';

const salt = process.env.SALT!;
const secret = process.env.SECRET!;

export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async createUser(body: RegisterDTO) {
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

  checkIfAdminExist() {
    return this.prismaService.client.user.findFirst({
      where: { is_admin: true },
    });
  }

  async loginUser(body: LoginDTO) {
    const user = await this.findUser(body.email);
    if (user) {
      const confirmedPassword = await compare(body.password, user.password);
      if (confirmedPassword) {
        return await this.signJWT(body.email);
      }
      return false;
    }
    return false;
  }

  private signJWT(email: string) {
    return new Promise<string>((resolve, reject) => {
      jwt.sign({ email }, secret, { expiresIn: '7d', algorithm: 'HS256' }, (err, token) => {
        if (err) {
          console.log(err);

          reject(err);
        } else {
          resolve(token as string);
        }
      });
    });
  }

  public verifyToken(token: string): Promise<IPayload> {
    return new Promise<IPayload>((resolve, reject) => {
      jwt.verify(token, secret, (err: jwt.VerifyErrors | null, payload: unknown) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(payload as IPayload);
      });
    });
  }

  async findUser(email: string) {
    return await this.prismaService.client.user.findFirst({
      where: {
        email,
      },
    });
  }
}
