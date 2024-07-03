import { Request, Response } from 'express';
import Donatie from '../../../infrastructuur/database/modellen/donatieModel';

export const maakDonatie = async (req: Request, res: Response) => {
  try {
    const { bedrag, donateurNaam, bericht } = req.body;
    const nieuweDonatie = new Donatie({ bedrag, donateurNaam, bericht });
    await nieuweDonatie.save();
    res.status(201).json(nieuweDonatie);
  } catch (error) {
    res.status(500).json({ message: 'Fout bij het maken van donatie', error });
  }
};
