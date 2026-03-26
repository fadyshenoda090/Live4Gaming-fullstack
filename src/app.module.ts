import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games/game.entity';
import { Tournament } from './tournaments/tournament.entity';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ParticipantsModule } from './participants/participants.module';
import * as path from 'path';

@Module({
  imports: [
    GamesModule,
    TournamentsModule,
    UsersModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '.env.development'),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DATABASE'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('PASSWORD'),
          port: config.get<number>('DB_PORT'),
          host: config.get<string>('HOST'),
          synchronize: process.env.NODE_ENV !== 'production',
          entities: [Game, Tournament, User],
        };
      },
    }),
    ParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
