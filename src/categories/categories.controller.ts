import { Controller, Get, Post, Body, HttpStatus, HttpCode, UseGuards, Patch, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { createSuccessResponse } from '../common/utils/api.response';
import { SuccessResponse } from '../common/types/api.types';
import { Category } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';


@Controller('categories')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
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

  @Patch()
  async update(
    @Query('id', new DefaultValuePipe(1), ParseIntPipe) id: number
  ) {
    const updateCategory = await this.categoriesService.update(id)
    return updateCategory
  }
}