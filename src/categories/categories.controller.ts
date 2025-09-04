import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { createSuccessResponse } from 'src/common/utils/api.response';
import { SuccessResponse } from 'src/common/types/api.types';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UseGuards(AuthGuard('jwt')) // TODO: Add JWT Auth + Admin Role check in D2/D3
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<SuccessResponse<Category>> {
    const category = await this.categoriesService.create(createCategoryDto);
    return createSuccessResponse(category)
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return createSuccessResponse(categories)
  }
}