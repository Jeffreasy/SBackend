import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Gebruiker from '../../infrastructuur/database/modellen/gebruikerModel';
import { User } from '../../type/express';
import { Types } from 'mongoose';

interface JwtPayload {
  id: string;
}

interface RequestWithUser extends Request {
  user?: User;
}

export const checkRole = (roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).send({ error: 'Geen token, autorisatie geweigerd' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      const gebruiker = await Gebruiker.findById(decoded.id).exec();
      if (!gebruiker || !roles.includes(gebruiker.rol)) {
        return res.status(403).send({ error: 'Toegang geweigerd' });
      }

      req.user = {
        id: gebruiker._id instanceof Types.ObjectId ? gebruiker._id.toString() : gebruiker._id,
        naam: gebruiker.naam,
        email: gebruiker.email,
        wachtwoord: gebruiker.wachtwoord,
        rol: gebruiker.rol,
      } as User;

      next();
    } catch (err) {
      res.status(401).send({ error: 'Niet geautoriseerd' });
    }
  };
};
