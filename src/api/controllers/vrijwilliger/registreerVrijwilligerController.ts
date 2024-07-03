import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Vrijwilliger from '../../../infrastructuur/database/modellen/vrijwilligerModel';

export const registreerVrijwilliger = async (req: Request, res: Response) => {
  console.log('Ontvangen in controller:', JSON.stringify(req.body, null, 2));
  try {
    const { naam, email, telefoonnummer } = req.body;
    console.log('Geëxtraheerde velden:', { naam, email, telefoonnummer });

    // Log de types van de velden
    console.log('Types van velden:', {
      naam: typeof naam,
      email: typeof email,
      telefoonnummer: typeof telefoonnummer
    });

    // Controleer of alle vereiste velden aanwezig zijn
    if (!naam || !email || !telefoonnummer) {
      throw new Error('Naam, email en telefoonnummer zijn verplicht');
    }

    console.log('Vóór het aanmaken van nieuwe Vrijwilliger:', { naam, email, telefoonnummer });
    const nieuweVrijwilliger = new Vrijwilliger({ naam, email, telefoonnummer });
    console.log('Na het aanmaken van nieuwe Vrijwilliger:', nieuweVrijwilliger.toObject());

    const opgeslagenVrijwilliger = await nieuweVrijwilliger.save();
    console.log('Vrijwilliger opgeslagen:', opgeslagenVrijwilliger.toObject());

    res.status(201).json(opgeslagenVrijwilliger);
  } catch (fout: unknown) {
    console.error('Fout in registreerVrijwilliger:', fout);
    if (fout instanceof mongoose.Error.ValidationError) {
      console.log('Validatiefout details:', fout.errors);
      res.status(400).json({ bericht: 'Validatiefout', fout: fout.message, details: fout.errors });
    } else if (fout instanceof mongoose.Error && 'code' in fout && fout.code === 11000) {
      res.status(409).json({ bericht: 'Een vrijwilliger met dit e-mailadres bestaat al', fout: fout.message });
    } else {
      console.error('Onverwachte fout:', fout);
      res.status(500).json({ bericht: 'Fout bij het registreren van vrijwilliger', fout: fout instanceof Error ? fout.message : String(fout) });
    }
  }
};

export const haalVrijwilligersOp = async (req: Request, res: Response) => {
  try {
    const vrijwilligers = await Vrijwilliger.find();
    res.status(200).json(vrijwilligers);
  } catch (fout: unknown) {
    console.error('Fout bij het ophalen van vrijwilligers:', fout);
    res.status(500).json({ bericht: 'Fout bij het ophalen van vrijwilligers', fout: fout instanceof Error ? fout.message : String(fout) });
  }
};