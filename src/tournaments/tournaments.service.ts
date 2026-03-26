import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dtos/createTournament.dto';
import { UpdateTournamentDto } from './dtos/updateTournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Repository } from 'typeorm';
import { GamesService } from '../games/games.service';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
    private readonly gamesService: GamesService,
  ) {}

  /**
   * get all tournaments
   * @returns all tournaments
   * */
  public async getTournaments() {
    return await this.tournamentsRepository.find({ relations: ['game'] });
  }

  /**
   * get a single tournament
   * @param id
   * @returns tournament of the param id
   * */
  public async getSingleTournament(id: number) {
    const tournament = await this.tournamentsRepository.findOne({
      where: { id },
      relations: ['game'],
    });
    if (!tournament) {
      throw new NotFoundException('Tournament was not found');
    }
    return tournament;
  }
  /**
   * create a new tournament
   * @param tournamentData
   * @returns new tournament created
   * */
  public async createTournament(tournamentData: CreateTournamentDto) {
    const game = await this.gamesService.getSingleGame(
      Number(tournamentData.game),
    );
    const newTournament = this.tournamentsRepository.create({
      ...tournamentData,
      game,
    });
    return await this.tournamentsRepository.save(newTournament);
  }

  /**
   * update a single tournament
   * @param id
   * @param tournamentData
   * @returns updated tournament
   * */
  public async updateTournament(
    id: number,
    tournamentData: UpdateTournamentDto,
  ) {
    const tournament = await this.getSingleTournament(id);

    if (tournamentData.game) {
      const game = await this.gamesService.getSingleGame(
        Number(tournamentData.game),
      );
      tournament.game = game;
    }

    Object.assign(tournament, tournamentData);
    return await this.tournamentsRepository.save(tournament);
  }

  /**
   * delete a single tournament
   * @param id
   * @returns deleted tournament
   * */
  public async deleteTournament(id: number) {
    const tournament = await this.getSingleTournament(id);
    await this.tournamentsRepository.remove(tournament);
    return { message: `tournament with id ${id} was deleted`, tournament };
  }
}
