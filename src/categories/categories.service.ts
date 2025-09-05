import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomException } from '../common/exceptions/customException';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto
      },
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async update(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new CustomException('CATEGORY-NOT-FOUND', 'category not found', { categoryId: categoryId })
    }
  }
}