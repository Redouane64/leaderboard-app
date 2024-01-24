import { User } from '../../auth/interfaces';

export interface Score extends Pick<User, 'username'> {
  score: number;
}
