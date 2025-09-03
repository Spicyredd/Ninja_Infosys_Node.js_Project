import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  /**
   * Authenticates a user by validating their email and password.
   * If credentials are valid, it returns a JWT access token.
   * @param email The user's email.
   * @param password The user's plain-text password.
   * @returns An object containing the access token.
   * @throws UnauthorizedException if credentials are invalid.
   */
  async login(email: string, password: string) {
    // 1. Find the user by email.
    const user = await this.usersService.getProfile(email);

    // It's a good security practice to use a generic error message
    // to prevent attackers from discovering which emails are registered.
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Compare the provided password with the stored hash.
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    // console.log(user)
    // var isPasswordMatching = false
    // if (password === user.password) {
    //   isPasswordMatching = true
    // }
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. If they match, generate and return a JWT.
    // The JWT payload should contain essential, non-sensitive user info.
    const payload = {
      sub: user.id, // 'sub' is the standard claim for subject (user ID)
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    // 4. Return the response in the format specified by the apispec
    return {
      success: true,
      data: {
        access_token: accessToken,
      },
    };
  }
}
