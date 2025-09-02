import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  name_np: string;
}