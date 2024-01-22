import { AuthenticatedUser } from './interfaces';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: AuthenticatedUser;
    }
  }
}
