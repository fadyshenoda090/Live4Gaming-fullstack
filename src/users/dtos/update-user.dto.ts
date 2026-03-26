import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsMatch } from '../validators/is-match.decorator';
import { Type } from 'class-transformer';
import { UserRole } from '../../utils/enums';

export class StatsDto {
  @IsNumber()
  gamesPlayed: number;

  @IsNumber()
  wins: number;

  @IsNumber()
  losses: number;

  @IsNumber()
  draws: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Length(3, 50, { message: 'Username must be between 3 and 50 characters' })
  username?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    },
  )
  password?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsMatch('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString({ each: true })
  @IsOptional()
  achievements?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => StatsDto)
  stats?: Partial<StatsDto>;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  country?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  avatar?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  bio?: string;
}
