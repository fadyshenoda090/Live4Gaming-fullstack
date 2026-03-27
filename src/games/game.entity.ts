import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from '../utils/constants';
import { Tournament } from '../tournaments/tournament.entity';
import { GameGenre } from '../utils/enums';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'enum', enum: GameGenre })
  genre: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', length: 50 })
  developer: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ nullable: true })
  releaseDate?: string;

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

  @OneToMany(() => Tournament, (tournament) => tournament.game)
  tournaments: Tournament[];
}
