import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dtos/createTournament.dto';
import { UpdateTournamentDto } from './dtos/updateTournament.dto';

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
  public createTournament(@Body() tournamentData: CreateTournamentDto) {
    return this.tournamentsService.createTournament(tournamentData);
  }

  @Put(':id')
  public updateTournament(
    @Param('id', ParseIntPipe) id: number,
    @Body() tournamentData: UpdateTournamentDto,
  ) {
    return this.tournamentsService.updateTournament(id, tournamentData);
  }

  @Delete(':id')
  public deleteTournament(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentsService.deleteTournament(id);
  }
}
