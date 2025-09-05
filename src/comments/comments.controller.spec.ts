import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('CommentsController', () => {
  let controller: CommentsController;

  // 1. Create a mock object for the CommentsService
  const mockCommentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  // It's good practice to clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service to create a comment', async () => {
    const ticketId = 'ticket-123';
    const authorId = 'user-abc';
    const createDto = { body: 'This is a test comment' };

    // Mock the request object that the guard would have populated
    const mockRequest = {
      user: { sub: authorId },
    };

    mockCommentsService.create.mockResolvedValue({
      id: 1,
      ...createDto,
      ticketId,
      authorId,
    });

    await controller.create(ticketId, createDto, mockRequest as any);

    expect(mockCommentsService.create).toHaveBeenCalledWith(
      ticketId,
      createDto,
      authorId,
    );
  });
});