import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTournamentDto } from './dtos/createTournament.dto';
import { UpdateTournamentDto } from './dtos/updateTournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Repository } from 'typeorm';
import { GamesService } from '../games/games.service';
import { JWTPayloadType } from '../utils/types';
import { UserRole } from '../utils/enums';

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
    return await this.tournamentsRepository.find({
      relations: ['game', 'organizer'],
    });
  }

  /**
   * get a single tournament
   * @param id
   * @returns tournament of the param id
   * */
  public async getSingleTournament(id: number) {
    const tournament = await this.tournamentsRepository.findOne({
      where: { id },
      relations: ['game', 'organizer'],
    });
    if (!tournament) {
      throw new NotFoundException('Tournament was not found');
    }
    return tournament;
  }
  /**
   * create a new tournament
   * @param tournamentData
   * @param organizerId
   * @returns new tournament created
   * */
  public async createTournament(
    tournamentData: CreateTournamentDto,
    organizerId: number,
  ) {
    const game = await this.gamesService.getSingleGame(
      Number(tournamentData.game),
    );
    const newTournament = this.tournamentsRepository.create({
      ...tournamentData,
      game,
      organizer: { id: organizerId },
    });
    return await this.tournamentsRepository.save(newTournament);
  }

  /**
   * update a single tournament
   * @param id
   * @param tournamentData
   * @param user
   * @returns updated tournament
   * */
  public async updateTournament(
    id: number,
    tournamentData: UpdateTournamentDto,
    user: JWTPayloadType,
  ) {
    const tournament = await this.getSingleTournament(id);

    if (
      user.role !== UserRole.admin &&
      tournament.organizer.id !== user.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to update this tournament',
      );
    }

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
   * @param user
   * @returns deleted tournament
   * */
  public async deleteTournament(id: number, user: JWTPayloadType) {
    const tournament = await this.getSingleTournament(id);

    if (
      user.role !== UserRole.admin &&
      tournament.organizer.id !== user.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete this tournament',
      );
    }

    await this.tournamentsRepository.remove(tournament);
    return { message: `tournament with id ${id} was deleted`, tournament };
  }
}
