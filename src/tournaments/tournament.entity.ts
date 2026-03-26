import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from '../utils/constants';
import { Game } from '../games/game.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'tournaments' })
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  genre: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar' })
  prizePool: string;

  @Column({ type: 'varchar' })
  startDate: string;

  @Column({ type: 'varchar' })
  endDate: string;

  @Column({ type: 'varchar' })
  status: string;

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

  @ManyToOne(() => Game, (game) => game.tournaments)
  game: Game;

  @ManyToOne(() => User, (user) => user.organizedTournaments)
  organizer: User;

  @Column({ type: 'int', default: 0 })
  maxParticipants: number;

  @ManyToMany(() => User, (user) => user.tournaments)
  joinedParticipants: User[];
}
