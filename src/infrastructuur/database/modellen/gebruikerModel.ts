import mongoose, { Schema, Document } from 'mongoose';

export interface IGebruiker extends Document {
  naam: string;
  email: string;
  wachtwoord: string;
}

const GebruikerSchema: Schema = new Schema({
  naam: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  wachtwoord: { type: String, required: true },
});

export default mongoose.model<IGebruiker>('Gebruiker', GebruikerSchema);
