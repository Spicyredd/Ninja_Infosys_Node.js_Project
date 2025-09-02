import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { AuthGuard } from '@nestjs/passport'; // We will uncomment this in D2

@Controller() // We'll handle the pathing inside the methods
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // The OpenAPI spec maps GET /me to this controller
  @Get('me')
  // @UseGuards(AuthGuard('jwt')) // TODO: Add JWT authentication in D2
  async getProfile(/*@Req() req*/) { // TODO: Get user from request in D2
    const user = await this.usersService.getProfile(); // For now, it takes no args
    return {
      success: true,
      data: user,
    };
  }
}