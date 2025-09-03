import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request } from 'express';


@Controller() // We'll handle the pathing inside the methods
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    if (!req.user || typeof req.user !== 'object' || !('email' in req.user)) {
      return {
        success: false,
        message: 'User info not found in request.',
      };
    }
    const user = await this.usersService.getProfile((req.user as any).email);
    return {
      success: true,
      data: user,
    };
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfileById(@Req() req: Request) {
    if (!req.user || typeof req.user !== 'object' || !('email' in req.user)) {
      return {
        success: false,
        message: 'User info not found in request.',
      };
    }
    const user = await this.usersService.getProfileById((req.user as any).id);
    return {
      success: true,
      data: user,
    };
  }
}