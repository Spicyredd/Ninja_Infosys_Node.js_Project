import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client'; // Import the Role enum

@Injectable()
export class UsersService {
  constructor() {}

  async getProfile() {
    // --- THIS IS A PLACEHOLDER FOR D1 ---
    // In D2, this method will take a userId and fetch the real user from the DB.
    
    console.log('UsersService getProfile method called.');

    // Return a mock response that matches the User schema in the API spec
    const mockUser = {
      id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      email: 'citizen.test@gunaso.gov.np',
      fullName: 'Test Citizen',
      role: Role.CITIZEN, // Using the Prisma enum
      wardId: 1,
    };

    return mockUser;
  }
}