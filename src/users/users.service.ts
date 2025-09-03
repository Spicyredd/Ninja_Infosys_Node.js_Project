import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client'; // Import the Role enum
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getProfile(email: string): Promise<User | null> {
      /**
 * Finds a user by their email address.
 * NOTE: This method should select the password field, as it's needed for authentication.
 * Make sure your Prisma schema doesn't exclude it by default for this query.
 * @param email The email of the user to find.
 * @returns The user object or null if not found.
 */
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}