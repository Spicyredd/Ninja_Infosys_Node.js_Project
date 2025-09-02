import { Controller, Get } from '@nestjs/common';
import { WardsService } from './wards.service';

@Controller('wards')
export class WardsController {
  constructor(private readonly wardsService: WardsService) {}

  @Get()
  async findAll() {
    const wards = await this.wardsService.findAll();
    return {
      success: true,
      data: wards,
    };
  }
}