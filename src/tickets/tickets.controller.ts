import { Controller, Get, Post, Body, Param, Query, Patch, ParseIntPipe, DefaultValuePipe, UseGuards, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createSuccessResponse } from '../common/utils/api.response';
import { ApiResponse, SuccessResponse } from 'src/common/types/api.types';
import { AssignTicketDto } from './dto/assign-ticket.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorators';
import { Role } from '@prisma/client'
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @Req() req: Request,
  ) {
    const newTicketData = await this.ticketsService.create(createTicketDto, (req.user as any).sub);
    const newTicket = newTicketData[0]
    const ticketCount = newTicketData[1]
    return createSuccessResponse(newTicket, { totalTickets: ticketCount })
  }


  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
  ) {
    const clampedPageSize = Math.min(pageSize, 100); // Cap pageSize at 100

    const { data, meta } = await this.ticketsService.findAll(page, clampedPageSize);
    // const allTickets = await this.ticketsService.findAll();
    return createSuccessResponse(data, meta)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const singleTicket = await this.ticketsService.findOne(id);
    return createSuccessResponse(singleTicket)
  }

  @Patch(':id/assign')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('STAFF', 'ADMIN')
  async assignTicket(
    @Param('id') id: string,
    @Body() dto: AssignTicketDto,
    @Req() req: any,
  ) {
    const ticket = await this.ticketsService.assignTicket(id, dto.assignedToId);

    return {
      success: true,
      data: ticket,
      meta: {},
    };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STAFF, Role.ADMIN)
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    const ticket = await this.ticketsService.updateStatus(id, dto.status);
    return { success: true, data: ticket, meta: {} };
  }
}
