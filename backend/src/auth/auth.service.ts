import { PrismaService } from '@/database/prisma.service.js';
import { IPayload } from '@/interface/index.js';
import jwt from 'jsonwebtoken';
import { LoginDTO } from './dto/login.dto.js';
import { compare } from 'bcryptjs';

const secret = process.env.SECRET!;

export class AuthService {
  constructor(private prismaService: PrismaService) {}

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

  // async verifyToken(token: string) {
  //   return new Promise((resolve, reject) => {
  //     jwt.verify(token, secret, (err, payload) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(payload as IToken);
  //     });
  //   });
  // }

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
