import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('/health')
  async check() {
    try {
      await this.prisma.isHealthy();

      return {
        status: 'up',
        database: 'connected',
      };
    } catch (error) {
      return {
        status: 'up',
        database: 'disconnected',
        error: (error as Error).message,
      };
    }
  }
}
