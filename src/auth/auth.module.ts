// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// You will create this file in a later step for route protection
// import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    UsersModule, // Make UsersService available for injection
    PassportModule,
    JwtModule.register({
      // IMPORTANT: Use environment variables for these in production!
      secret: 'YOUR_SUPER_SECRET_KEY', // Change this to a strong, random secret
      signOptions: { expiresIn: '1d' }, // e.g., '60s', '1h', '7d'
    }),
  ],
  providers: [AuthService /*, JwtStrategy */], // Add JwtStrategy later
  controllers: [AuthController],
})
export class AuthModule { }