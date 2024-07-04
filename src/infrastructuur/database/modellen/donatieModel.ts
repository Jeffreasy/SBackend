import mongoose, { Schema, Document } from 'mongoose';

export interface IDonatie extends Document {
  bedrag: number;
  donateurNaam: string;
  bericht?: string;
  donateur: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const DonatieSchema: Schema = new Schema(
  {
    bedrag: { type: Number, required: true },
    donateurNaam: { type: String, required: true },
    bericht: { type: String },
    donateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Gebruiker' },
  },
  { timestamps: true }
);

const Donatie = mongoose.models.Donatie || mongoose.model<IDonatie>('Donatie', DonatieSchema);
export default Donatie;
