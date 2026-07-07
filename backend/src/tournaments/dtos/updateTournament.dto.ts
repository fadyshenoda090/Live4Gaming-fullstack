import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TournamentStatus } from './createTournament.dto';

export class UpdateTournamentDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string (URL)' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Game must be a string' })
  @IsNotEmpty({ message: 'Game must not be empty' })
  game?: string;

  @IsOptional()
  @IsString({ message: 'Prize pool must be a string' })
  @IsNotEmpty({ message: 'Prize pool must not be empty' })
  prizePool?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Start date must be a valid date string (YYYY-MM-DD)' },
  )
  startDate?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'End date must be a valid date string (YYYY-MM-DD)' },
  )
  endDate?: string;

  @IsOptional()
  @IsEnum(TournamentStatus, {
    message: 'Status must be Upcoming, Ongoing, or Completed',
  })
  status?: TournamentStatus;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Max participants must be a number' })
  @Min(0, { message: 'Max participants cannot be negative' })
  maxParticipants?: number;
}
