import { User } from './express';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}