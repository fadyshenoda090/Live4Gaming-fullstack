import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from '../utils/constants';
import { Tournament } from '../tournaments/tournament.entity';
import { UserRole } from '../utils/enums';
import { Game } from '../games/game.entity';
import { StatsDto } from './dtos/update-user.dto';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 150 })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column('simple-array', { nullable: true })
  achievements: string[];

  @Column({ type: 'jsonb', nullable: true })
  stats: StatsDto;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.normalUser })
  role: UserRole;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @ManyToMany(() => Game)
  @JoinTable({ name: 'user_favorite_games' })
  favoriteGames: Game[];

  @ManyToMany(() => Tournament, (tournament) => tournament.joinedParticipants)
  @JoinTable({ name: 'tournament_participants' })
  tournaments: Tournament[];
}
