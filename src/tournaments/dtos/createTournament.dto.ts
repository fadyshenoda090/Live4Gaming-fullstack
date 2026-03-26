import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsNumber,
  IsDateString,
  IsEnum,
  Min,
} from 'class-validator';

export enum TournamentStatus {
  UPCOMING = 'Upcoming',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
}

export class CreateTournamentDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title must not be empty' })
  @Length(3, 100, { message: 'Title must be between 3 and 100 characters' })
  title: string;

  @IsString({ message: 'Genre must be a string' })
  @IsNotEmpty({ message: 'Genre must not be empty' })
  genre: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string (URL)' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsString({ message: 'Game must be a string' })
  @IsNotEmpty({ message: 'Game must not be empty' })
  game: string;

  @IsString({ message: 'Prize pool must be a string' })
  @IsNotEmpty({ message: 'Prize pool must not be empty' })
  prizePool: string;

  @IsDateString(
    {},
    { message: 'Start date must be a valid date string (YYYY-MM-DD)' },
  )
  startDate: string;

  @IsDateString(
    {},
    { message: 'End date must be a valid date string (YYYY-MM-DD)' },
  )
  endDate: string;

  @IsEnum(TournamentStatus, {
    message: 'Status must be Upcoming, Ongoing, or Completed',
  })
  status: TournamentStatus;

  @IsNumber({}, { message: 'Max participants must be a number' })
  @Min(0, { message: 'Max participants cannot be negative' })
  maxParticipants: number;
}
