import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { WardsModule } from './wards/wards.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [AuthModule, UsersModule, CategoriesModule, WardsModule, TicketsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
