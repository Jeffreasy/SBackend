import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import Gebruiker from '../../infrastructuur/database/modellen/gebruikerModel';
import { Types } from 'mongoose';

// Verwijder de ongebruikte import van 'User'
// import { User } from '../../type/express';

// Verwijder de ongebruikte interface
// interface JwtPayload {
//   id: string;
// }

// Gebruik de functie of verwijder deze als hij niet nodig is
function isObjectIdString(id: unknown): id is string {
  return typeof id === 'string' && Types.ObjectId.isValid(id);
}

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: 'Geen token, autorisatie geweigerd' });
      }

      // Gebruik isObjectIdString om de id te valideren
      if (!isObjectIdString(req.user.id)) {
        return res.status(400).send({ error: 'Ongeldige gebruikers-ID' });
      }

      const gebruiker = await Gebruiker.findById(req.user.id).exec();
      if (!gebruiker || !roles.includes(gebruiker.rol)) {
        return res.status(403).send({ error: 'Toegang geweigerd' });
      }

      req.user = gebruiker.toObject();
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