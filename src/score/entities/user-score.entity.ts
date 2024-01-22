import { UserEntity } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'scores' })
export class UserScoreEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'name' })
  user: UserEntity;

  @Column('int', { default: 0, nullable: false })
  score: number;
}
