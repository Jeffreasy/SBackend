import { Request, Response } from 'express';
import Evenement from '../../../infrastructuur/database/modellen/evenementModel';

export const maakEvenement = async (req: Request, res: Response) => {
  try {
    const { naam, datum, locatie } = req.body;
    const nieuwEvenement = new Evenement({ naam, datum, locatie });
    await nieuwEvenement.save();
    res.status(201).json(nieuwEvenement);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Fout bij het maken van evenement', error });
  }
};

export const haalEvenementen = async (req: Request, res: Response) => {
  try {
    const evenementen = await Evenement.find();
    res.status(200).json(evenementen);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Fout bij het ophalen van evenementen', error });
  }
};
