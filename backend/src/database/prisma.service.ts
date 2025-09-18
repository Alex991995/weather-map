import { PrismaClient } from '@/generated/prisma/client.js';

export class PrismaService {
  client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();
      console.log('Database is connected');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Database is crushed' + error.message);
      }
    }
  }
  async disconnect() {
    await this.client.$disconnect();
    console.log('Database is disconnected');
  }
}
