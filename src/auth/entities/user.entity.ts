import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
@Index(['name'], { unique: true })
export class UserEntity {
  @PrimaryColumn('text', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'password_hash', nullable: false })
  passwordHash: string;
}
