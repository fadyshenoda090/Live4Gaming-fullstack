import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGameDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
  @IsOptional()
  title: string;

  @IsString({ message: 'Genre must be a string' })
  @IsNotEmpty({ message: 'Genre must not be empty' })
  @IsOptional()
  genre: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  @IsOptional()
  rating: number;

  @IsOptional()
  @IsString({ message: 'Image must be a string (URL)' })
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}
