import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { Tournament } from './tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
  imports: [TypeOrmModule.forFeature([Tournament]), GamesModule, UsersModule],
})
export class TournamentsModule {}
