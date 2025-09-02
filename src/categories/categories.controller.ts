import { Controller, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UseGuards(AuthGuard('jwt')) // TODO: Add JWT Auth + Admin Role check in D2/D3
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.create(createCategoryDto);
    return {
      success: true,
      data: category,
    };
  }

  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return {
      success: true,
      data: categories,
    };
  }
}