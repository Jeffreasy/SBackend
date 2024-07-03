import mongoose, { Schema, Document } from 'mongoose';

export interface IEvenement extends Document {
  naam: string;
  datum: Date;
  locatie: string;
  beschrijving?: string; // Optionele beschrijving
  aanmeldingen: mongoose.Schema.Types.ObjectId[]; // Array van user IDs
  organisator: mongoose.Schema.Types.ObjectId; // Relatie met Gebruiker model
}

const EvenementSchema: Schema = new Schema(
  {
    naam: { type: String, required: true },
    datum: { type: Date, required: true },
    locatie: { type: String, required: true },
    beschrijving: { type: String },
    aanmeldingen: [{ type: Schema.Types.ObjectId, ref: 'Gebruiker' }],
    organisator: { type: Schema.Types.ObjectId, ref: 'Gebruiker' },
  },
  { timestamps: true }
);

export default mongoose.model<IEvenement>('Evenement', EvenementSchema);
