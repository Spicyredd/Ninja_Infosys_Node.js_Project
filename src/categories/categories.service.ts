import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    // --- THIS IS A PLACEHOLDER FOR D1 ---
    console.log('CategoriesService create method called with:', createCategoryDto);
    
    // Return a mock of what the created category would look like
    return {
      id: 1,
      is_active: true,
      ...createCategoryDto,
    };
  }

  findAll() {
    // --- THIS IS A PLACEHOLDER FOR D1 ---
    console.log('CategoriesService findAll method called.');
    
    // Return a mock array of categories
    return [
      {
        id: 1,
        code: 'DRAINAGE',
        name_en: 'Drainage and Sewage',
        name_np: 'ढल तथा निकास',
        is_active: true,
      },
      {
        id: 2,
        code: 'ROADS',
        name_en: 'Roads and Potholes',
        name_np: 'सडक तथा खाल्डाखुल्डी',
        is_active: true,
      },
    ];
  }
}