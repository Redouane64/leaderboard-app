import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../interfaces';

@Entity({ name: 'users' })
@Index(['username'], { unique: true })
export class UserEntity implements User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { name: 'username', nullable: false })
  username: string;

  @Column('jsonb', {
    name: 'roles',
    nullable: false,
    default: ['player'],
  })
  roles: string[];

  @Column('int', { default: 0, nullable: false })
  score: number;
}
