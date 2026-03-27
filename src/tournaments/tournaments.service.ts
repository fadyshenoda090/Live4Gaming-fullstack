import {
  ForbiddenException,
  Injectable,
  NotFoundException,
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

  private async findTournamentEntity(id: number) {
    const tournament = await this.tournamentsRepository.findOne({
      where: { id },
      relations: ['game', 'organizer', 'joinedParticipants'],
    });

    if (!tournament) {
      throw new NotFoundException('Tournament was not found');
    }

    return tournament;
  }

  private mapTournamentResponse(tournament: Tournament) {
    return {
      ...tournament,
      organizer: {
        id: tournament.organizer.id,
        username: tournament.organizer.username,
        fullName: `${tournament.organizer.firstName} ${tournament.organizer.lastName}`,
        avatar: tournament.organizer.avatar,
      },
    };
  }

  /**
   * get all tournaments
   * @returns all tournaments
   * */
  public async getTournaments() {
    const tournaments = await this.tournamentsRepository.find({
      relations: ['game', 'organizer', 'joinedParticipants'],
    });
    return tournaments.map((tournament) => ({
      ...tournament,
      organizer: {
        id: tournament.organizer.id,
        username: tournament.organizer.username,
        fullName: `${tournament.organizer.firstName} ${tournament.organizer.lastName}`,
        avatar: tournament.organizer.avatar,
      },
    }));
  }

  /**
   * get a single tournament
   * @param id
   * @returns tournament of the param id
   * */
  public async getSingleTournament(id: number) {
    const tournament = await this.findTournamentEntity(id);
    if (!tournament) {
      throw new NotFoundException('Tournament was not found');
    }
    return this.mapTournamentResponse(tournament);
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

    if (new Date(tournamentData.startDate) > new Date(tournamentData.endDate)) {
      throw new ForbiddenException('Start date cannot be after end date');
    }

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

    // Authorization
    if (user.role !== UserRole.admin && tournament.organizer.id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this tournament',
      );
    }

    if (tournamentData.game) {
      tournament.game = await this.gamesService.getSingleGame(
        Number(tournamentData.game),
      );
    }

    const newStartDate = tournamentData.startDate || tournament.startDate;
    const newEndDate = tournamentData.endDate || tournament.endDate;

    if (
      newStartDate &&
      newEndDate &&
      new Date(newStartDate) > new Date(newEndDate)
    ) {
      throw new ForbiddenException('Start date cannot be after end date');
    }

    if (
      tournamentData.maxParticipants !== undefined &&
      tournamentData.maxParticipants < tournament.joinedParticipants.length
    ) {
      throw new ForbiddenException(
        `Max participants cannot be less than already joined participants (${tournament.joinedParticipants.length})`,
      );
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
    const tournament = await this.findTournamentEntity(id);

    if (user.role !== UserRole.admin && tournament.organizer.id !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this tournament',
      );
    }

    await this.tournamentsRepository.remove(tournament);
    return { message: `tournament with id ${id} was deleted`, tournament };
  }
}
