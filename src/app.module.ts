import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { WardsModule } from './wards/wards.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';

const THROTTLE_TTL = process.env.THROTTLE_TTL ? process.env.THROTTLE_TTL as any : 60000
const THROTTLE_LIMIT_PUBLIC = process.env.THROTTLE_LIMIT_PUBLIC ? process.env.THROTTLE_LIMIT_PUBLIC as any : 60000

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }), AuthModule, PrismaModule, UsersModule, CategoriesModule, WardsModule, TicketsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
