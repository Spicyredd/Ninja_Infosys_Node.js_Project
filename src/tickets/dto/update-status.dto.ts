import { IsEnum } from 'class-validator';
import { TicketStatus } from '@prisma/client'; // Prisma generated enum

export class UpdateStatusDto {
  @IsEnum(TicketStatus, {
    message: `status must be one of: ${Object.values(TicketStatus).join(', ')}`,
  })
  status: TicketStatus;
}
