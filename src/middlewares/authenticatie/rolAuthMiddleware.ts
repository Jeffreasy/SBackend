import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Gebruiker from '../../infrastructuur/database/modellen/gebruikerModel';
import { User } from '../../type/express'; // Voeg deze regel toe om User te importeren

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).send({ error: 'Geen token, autorisatie geweigerd' });
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const gebruiker = await Gebruiker.findById(decoded.id);
      if (!gebruiker || !roles.includes(gebruiker.rol)) {
        return res.status(403).send({ error: 'Toegang geweigerd' });
      }

      req.user = {
        id: gebruiker._id.toString(),
        naam: gebruiker.naam,
        email: gebruiker.email,
        wachtwoord: gebruiker.wachtwoord,
        rol: gebruiker.rol
      } as User; // Zorg ervoor dat User correct is geïmporteerd

      next();
    } catch (err) {
      res.status(401).send({ error: 'Niet geautoriseerd' });
    }
  };
};
