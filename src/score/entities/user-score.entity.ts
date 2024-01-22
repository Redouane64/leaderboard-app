import { UserEntity } from 'src/auth/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'scores' })
export class UserScoreEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @OneToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'name' })
  user: UserEntity;
}
