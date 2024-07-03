import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import Gebruiker from '../../infrastructuur/database/modellen/gebruikerModel';
import { User } from '../../type/express';
import { Types } from 'mongoose';

interface JwtPayload {
  id: string;
}

function isObjectIdString(id: unknown): id is string {
  return typeof id === 'string' && Types.ObjectId.isValid(id);
}

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Geen token, autorisatie geweigerd' });
      }

      const gebruiker = await Gebruiker.findById(req.user.id).exec();
      if (!gebruiker || !roles.includes(gebruiker.rol)) {
        return res.status(403).send({ error: 'Toegang geweigerd' });
      }

      req.user = gebruiker.toObject(); // Toewijzen van de hele gebruiker (zonder Mongoose-specifieke methoden)
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ error: 'Token expired' });
      } else if (err instanceof JsonWebTokenError) {
        return res.status(401).send({ error: 'Invalid token' });
      }
      res.status(401).send({ error: 'Niet geautoriseerd' });
    }
  };
};
