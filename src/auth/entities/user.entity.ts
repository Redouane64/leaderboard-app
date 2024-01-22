import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { AuthService, defaultRoles } from '../auth.service';

@Entity({ name: 'users' })
@Index(['name'], { unique: true })
export class UserEntity {
  @PrimaryColumn('text', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column('jsonb', {
    name: 'roles',
    nullable: false,
    default: defaultRoles,
  })
  roles: string[];
}
