import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  constructor() {
    // Pass PrismaClient options here if needed, e.g., for logging
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    // This is a lifecycle hook from NestJS.
    // It's a good place to connect to the database.
    await this.$connect();
  }

  async onApplicationShutdown() {
    // This is another lifecycle hook that ensures
    // your application gracefully disconnects from the database on shutdown.
    await this.$disconnect();
  }
}