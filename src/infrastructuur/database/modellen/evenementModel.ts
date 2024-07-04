import mongoose, { Schema, Document } from 'mongoose';

export interface IEvenement extends Document {
  titel: string;
  beschrijving: string;
  datum: Date;
  locatie: string;
  organisator: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const EvenementSchema: Schema = new Schema(
  {
    titel: { type: String, required: true },
    beschrijving: { type: String, required: true },
    datum: { type: Date, required: true },
    locatie: { type: String, required: true },
    organisator: { type: mongoose.Schema.Types.ObjectId, ref: 'Gebruiker' },
  },
  { timestamps: true }
);

const Evenement = mongoose.models.Evenement || mongoose.model<IEvenement>('Evenement', EvenementSchema);
export default Evenement;
