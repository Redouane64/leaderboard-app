import { Column, Entity, Index, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { defaultRoles } from '../auth.service';
import { UserScore } from '../../score/interfaces';

@Entity({ name: 'users' })
@Index(['name'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column('jsonb', {
    name: 'roles',
    nullable: false,
    default: defaultRoles,
  })
  roles: string[];

  @Column('int', { default: 0, nullable: false })
  score: number;
}
