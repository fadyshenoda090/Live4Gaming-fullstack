import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGameDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
  title: string;

  @IsString({ message: 'Genre must be a string' })
  @IsNotEmpty({ message: 'Genre must not be empty' })
  genre: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Rating must be a number' })
  @Min(0, { message: 'Rating must be at least 0' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating: number;

  @IsOptional()
  @IsString({ message: 'Image must be a string (URL)' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsDateString({}, { message: 'Release date must be a valid ISO date string' })
  releaseDate: string;

  @IsString({ message: 'Developer must be a string' })
  @IsNotEmpty({ message: 'Developer must not be empty' })
  developer: string;
}
