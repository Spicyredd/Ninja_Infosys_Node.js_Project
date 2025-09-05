import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard'; // <-- Import the new RolesGuard
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Role, TicketStatus } from '@prisma/client';

const createSuccessResponse = (data, meta = {}) => ({
  success: true,
  data,
  meta,
});

describe('TicketsController', () => {
  let controller: TicketsController;

  // Create a comprehensive mock for TicketsService, matching all used methods
  const mockTicketsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    assignTicket: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: mockTicketsService,
        },
      ],
    })
      // We must override every guard used by the controller
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service and return a success response with ticket and count', async () => {
      const authorId = 'user-uuid-abc';
      const createTicketDto: CreateTicketDto = {
        title: 'New Ticket Title',
        description: 'Detailed description of the issue.',
        categoryId: 1,
        wardId: 5,
      };
      const mockRequest = { user: { sub: authorId } };
      const newTicketData = { id: 'ticket-uuid-123', ...createTicketDto };
      const ticketCount = 15;

      // The service now returns an array: [ticket, count]
      mockTicketsService.create.mockResolvedValue([newTicketData, ticketCount]);

      const result = await controller.create(createTicketDto, mockRequest as any);

      expect(mockTicketsService.create).toHaveBeenCalledWith(createTicketDto, authorId);
      expect(result).toEqual(createSuccessResponse(newTicketData, { totalTickets: ticketCount }));
    });
  });

  describe('findAll', () => {
    it('should call the service with pagination and return a success response', async () => {
      const page = 1;
      const pageSize = 10;
      const serviceResponse = {
        data: [{ id: 'ticket-1' }, { id: 'ticket-2' }],
        meta: { totalItems: 2, currentPage: 1, pageSize: 10, totalPages: 1 },
      };

      mockTicketsService.findAll.mockResolvedValue(serviceResponse);

      const result = await controller.findAll(page, pageSize);

      expect(mockTicketsService.findAll).toHaveBeenCalledWith(page, pageSize);
      expect(result).toEqual(createSuccessResponse(serviceResponse.data, serviceResponse.meta));
    });
  });

  describe('findOne', () => {
    it('should call the service with an id and return a success response', async () => {
      const ticketId = 'ticket-uuid-123';
      const singleTicket = { id: ticketId, title: 'A single ticket' };

      mockTicketsService.findOne.mockResolvedValue(singleTicket);

      const result = await controller.findOne(ticketId);

      expect(mockTicketsService.findOne).toHaveBeenCalledWith(ticketId);

      expect(result).toEqual({ success: true, data: singleTicket });
    });
  });

  describe('assignTicket', () => {
    it('should call the service to assign a ticket and return the result', async () => {
      const ticketId = 'ticket-uuid-456';
      const assignDto: AssignTicketDto = { assignedToId: 'staff-user-uuid' };
      const updatedTicket = { id: ticketId, assignedToId: assignDto.assignedToId };

      mockTicketsService.assignTicket.mockResolvedValue(updatedTicket);

      const result = await controller.assignTicket(ticketId, assignDto, {} as any);

      expect(mockTicketsService.assignTicket).toHaveBeenCalledWith(ticketId, assignDto.assignedToId);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedTicket);
    });
  });

  describe('updateStatus', () => {
    it('should call the service to update a ticket status and return the result', async () => {
      const ticketId = 'ticket-uuid-789';
      const statusDto: UpdateStatusDto = { status: TicketStatus.RESOLVED };
      const updatedTicket = { id: ticketId, status: statusDto.status };

      mockTicketsService.updateStatus.mockResolvedValue(updatedTicket);

      const result = await controller.updateStatus(ticketId, statusDto);

      expect(mockTicketsService.updateStatus).toHaveBeenCalledWith(ticketId, statusDto.status);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedTicket);
    });
  });
});