import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketStatus } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) { }

  /**
   * Creates a new ticket and generates a unique, human-readable code.
   * @param createTicketDto - The DTO containing ticket data from the request.
   * @param userId - The ID of the user creating the ticket (from auth token).
   */
  async create(createTicketDto: CreateTicketDto, userId: string) {
    const ticketCount = await this.prisma.ticket.count()
    const nextTicketNumber = ticketCount + 1;
    const newTicketCode = `TKT-${String(nextTicketNumber).padStart(5, '0')}`;
    const ticket = await this.prisma.ticket.create({
      data: {
        ...createTicketDto,
        createdById: userId,
        code: newTicketCode,
        status: TicketStatus.NEW,
      },
    });
    return [ticket, ticketCount];
  }

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const tickets = await this.prisma.$transaction([
      this.prisma.ticket.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);
    const total = await this.prisma.ticket.count()
    const totalPages = Math.ceil(total / pageSize);

    // This structure clearly separates the data from the metadata
    return {
      data: tickets,
      meta: {
        totalItems: total,
        currentPage: page,
        pageSize: pageSize,
        totalPages: totalPages,
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id }
    });
  }

  remove(id: string) {
    return this.prisma.ticket.delete({
      where: { id }
    })
  }

  async assignTicket(ticketId: string, assignedToId: string) {
      // 1. Verify that the ticket exists
  const ticket = await this.prisma.ticket.findUnique({
    where: { id: ticketId },
  });
  if (!ticket) {
    throw new Error('Ticket not found');
  }

  // 2. Verify that the assigned user is STAFF or ADMIN
  const assignee = await this.prisma.user.findUnique({
    where: { id: assignedToId },
  });
  if (!assignee || (assignee.role !== 'STAFF' && assignee.role !== 'ADMIN')) {
    throw new Error('Assigned user must be STAFF or ADMIN');
  }

  // 3. Update the ticket assignment + set status to ACKNOWLEDGED if NEW
  return this.prisma.ticket.update({
    where: { id: ticketId },
    data: {
      assignedToId,
      status: ticket.status === TicketStatus.NEW ? TicketStatus.ACKNOWLEDGED : ticket.status,
      updatedAt: new Date(),
    },
    include: {
      assignedTo: true,
      ward: true,
      category: true,
    },
  });
  }

  async updateStatus(ticketId: string, newStatus: TicketStatus){
      // 1. Verify ticket exists
  const ticket = await this.prisma.ticket.findUnique({
    where: { id: ticketId },
  });
  if (!ticket) {
    throw new Error('Ticket not found');
  }

  // 2. Prepare update data
  const updateData: any = {
    status: newStatus,
    updatedAt: new Date(),
  };

  // Add closedAt only if setting to CLOSED
  if (newStatus === TicketStatus.CLOSED) {
    updateData.closedAt = new Date();
  }

  // 3. Update and return ticket
  return this.prisma.ticket.update({
    where: { id: ticketId },
    data: updateData,
    include: {
      assignedTo: true,
      ward: true,
      category: true,
    },
  });
  }

}
