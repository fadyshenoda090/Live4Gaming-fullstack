import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dtos/createTournament.dto';
import { UpdateTournamentDto } from './dtos/updateTournament.dto';
import { AuthRolesGuard } from '../users/auth/auth-roles.guard';
import { Roles } from '../users/decorators/user-role.decorator';
import { UserRole } from '../utils/enums';
import { UserProfile } from '../users/decorators/user-profile.decorator';
import { JWTPayloadType } from '../utils/types';

@Controller('api/tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get()
  public getTournaments() {
    return this.tournamentsService.getTournaments();
  }

  @Get(':id')
  public getSingleTournament(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentsService.getSingleTournament(id);
  }

  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.organizer, UserRole.admin)
  public createTournament(
    @Body() tournamentData: CreateTournamentDto,
    @UserProfile('id') organizerId: number,
  ) {
    return this.tournamentsService.createTournament(
      tournamentData,
      organizerId,
    );
  }

  @Put(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.organizer, UserRole.admin)
  public updateTournament(
    @Param('id', ParseIntPipe) id: number,
    @Body() tournamentData: UpdateTournamentDto,
    @UserProfile() user: JWTPayloadType,
  ) {
    return this.tournamentsService.updateTournament(id, tournamentData, user);
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.organizer, UserRole.admin)
  public deleteTournament(
    @Param('id', ParseIntPipe) id: number,
    @UserProfile() user: JWTPayloadType,
  ) {
    return this.tournamentsService.deleteTournament(id, user);
  }
}
