import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Gebruiker from '../../../infrastructuur/database/modellen/gebruikerModel';

export const registreerGebruiker = async (req: Request, res: Response) => {
  const { naam, email, wachtwoord } = req.body;

  try {
    const gebruikerBestaat = await Gebruiker.findOne({ email });
    if (gebruikerBestaat) {
      return res.status(400).json({ message: 'Gebruiker bestaat al' });
    }

    const zout = await bcrypt.genSalt(10);
    const gehashtWachtwoord = await bcrypt.hash(wachtwoord, zout);

    const gebruiker = await Gebruiker.create({
      naam,
      email,
      wachtwoord: gehashtWachtwoord,
    });

    const token = jwt.sign({ id: gebruiker._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
