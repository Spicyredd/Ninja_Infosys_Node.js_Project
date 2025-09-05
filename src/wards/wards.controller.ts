import { Controller, Get } from '@nestjs/common';
import { WardsService } from './wards.service';
import { createSuccessResponse } from '../common/utils/api.response';
import { SuccessResponse } from '../common/types/api.types';
import { Ward } from '@prisma/client';

@Controller('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) { }

  @Get()
  async findAll() {
    const wards = await this.wardsService.findAll();
    return createSuccessResponse(wards)
  }
}