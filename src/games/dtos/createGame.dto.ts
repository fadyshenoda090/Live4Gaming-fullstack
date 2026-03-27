import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  Max,
  Length,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GameGenre } from '../../utils/enums';

export class CreateGameDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
  title: string;

  @IsEnum(GameGenre, { message: 'invalid game genre' })
  genre: GameGenre;

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
