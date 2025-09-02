import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(140)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(5000)
  description: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsInt()
  @IsNotEmpty()
  wardId: number;
}