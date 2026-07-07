import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateGameDto } from './dtos/createGame.dto';
import { UpdateGameDto } from './dtos/updateGame.dto';
import { GamesService } from './games.service';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  public createGame(@Body() gameData: CreateGameDto) {
    return this.gamesService.createGame(gameData);
  }

  @Get()
  public getGames() {
    return this.gamesService.getGames();
  }

  @Get(':id')
  getSingleGame(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.getSingleGame(id);
  }

  @Put(':id')
  public updateGame(
    @Param('id', ParseIntPipe) id: number,
    @Body() gameData: UpdateGameDto,
  ) {
    return this.gamesService.updateGame(id, gameData);
  }

  @Delete(':id')
  deleteGame(@Param('id', ParseIntPipe) id: number) {
    return this.gamesService.deleteGame(id);
  }
}
