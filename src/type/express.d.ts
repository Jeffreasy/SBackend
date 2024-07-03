import { IGebruiker } from '../infrastructuur/database/modellen/gebruikerModel';

export interface User extends IGebruiker {
  id: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}