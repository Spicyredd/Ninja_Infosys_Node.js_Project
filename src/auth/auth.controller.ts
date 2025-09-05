import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { createSuccessResponse } from '../common/utils/api.response';

const THROTTLE_TTL = process.env.THROTTLE_TTL ? process.env.THROTTLE_TTL as any : 60000
const THROTTLE_LIMIT_AUTH = process.env.THROTTLE_LIMIT_AUTH ? process.env.THROTTLE_LIMIT_AUTH as any : 120
const THROTTLE_LIMIT_LOGIN = process.env.THROTTLE_LIMIT_LOGIN ? process.env.THROTTLE_LIMIT_LOGIN as any : 5


@Controller('auth')
@UseGuards(ThrottlerGuard)
@Throttle({ default: { limit: THROTTLE_LIMIT_AUTH, ttl: THROTTLE_TTL } })
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  // Limit login attempts: 5 per 60 seconds
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: THROTTLE_LIMIT_LOGIN, ttl: THROTTLE_TTL } })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(THROTTLE_LIMIT_AUTH)
    console.log(THROTTLE_LIMIT_LOGIN)
    const loginData = await this.authService.login(loginDto.email, loginDto.password);
    return createSuccessResponse(loginData)
  }
}
