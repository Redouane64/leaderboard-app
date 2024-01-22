export interface User {
  name: string;
  roles: string[];
  password: string;
}

export type AuthenticatedUser = Pick<User, 'name' | 'roles'>;
