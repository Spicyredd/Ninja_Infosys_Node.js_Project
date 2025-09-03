// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

const JWT_SECRET = process.env.JWT_SECRET

@Module({
  imports: [
    UsersModule, // Make UsersService available for injection
    PassportModule,
    JwtModule.register({
      // IMPORTANT: Use environment variables for these in production!
      secret: JWT_SECRET, // Change this to a strong, random secret
      signOptions: { expiresIn: '1d' }, // e.g., '60s', '1h', '7d'
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }