import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ThrottlerGuard } from '@nestjs/throttler'; // Import the guard

describe('AuthController', () => {
  let controller: AuthController;
  // You still need to mock the controller's direct dependencies
  const mockAuthService = {
    login: jest.fn(),
    // Add mocks for any other AuthService methods your controller uses
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: mockAuthService,
      }, UsersService, JwtService, PrismaService],
    }).overrideGuard(ThrottlerGuard).useValue({
      // Mock the canActivate method to always return true for tests
      canActivate: jest.fn().mockReturnValue(true)
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
