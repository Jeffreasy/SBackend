import mongoose, { Schema, Document } from 'mongoose';

export interface IDonatie extends Document {
  bedrag: number;
  donateurNaam: string;
  bericht?: string;
  datum: Date; // Datum van donatie
  donateur: mongoose.Schema.Types.ObjectId; // Relatie met Gebruiker model
}

const DonatieSchema: Schema = new Schema(
  {
    bedrag: { type: Number, required: true, min: 0 },
    donateurNaam: { type: String, required: true },
    bericht: { type: String },
    datum: { type: Date, default: Date.now },
    donateur: { type: Schema.Types.ObjectId, ref: 'Gebruiker' },
  },
  { timestamps: true }
);

export default mongoose.model<IDonatie>('Donatie', DonatieSchema);
