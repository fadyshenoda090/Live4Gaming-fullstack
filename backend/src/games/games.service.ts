import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dtos/createGame.dto';
import { UpdateGameDto } from './dtos/updateGame.dto';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  /**
   * create a new game
   * @param gameData
   * @returns new game created
   * */
  public async createGame(gameData: CreateGameDto) {
    const newGame = this.gamesRepository.create(gameData);
    return await this.gamesRepository.save(newGame);
  }

  /**
   * get all games
   * @returns all games
   * */
  public getGames() {
    return this.gamesRepository.find();
  }

  /**
   * get a single game
   * @param id
   * @returns game of the param id
   * */
  public async getSingleGame(id: number) {
    const game = await this.gamesRepository.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  /**
   * update a single game
   * @param id
   * @param gameData
   * @returns updated game
   * */
  public async updateGame(id: number, gameData: UpdateGameDto) {
    const game = await this.getSingleGame(id);
    Object.assign(game, gameData);
    return await this.gamesRepository.save(game);
  }

  /**
   * delete a single game
   * @param id
   * @returns deleted game
   * */
  public async deleteGame(id: number) {
    const game = await this.getSingleGame(id);
    await this.gamesRepository.remove(game);
    return { message: `game with id ${id} was deleted`, game };
  }
}
