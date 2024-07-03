import { IGebruiker } from '../infrastructuur/database/modellen/gebruikerModel';

interface User extends IGebruiker {
  id: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
