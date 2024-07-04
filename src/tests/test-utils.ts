import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import gebruiker, { IGebruiker } from '../infrastructuur/database/modellen/gebruikerModel';
import bcrypt from 'bcryptjs';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

export interface RegisterAndLoginResult {
  token: string;
  gebruiker: IGebruiker;
}

export const registerAndLogin = async (): Promise<RegisterAndLoginResult> => {
  const wachtwoord = 'wachtwoord123';
  const hashedPassword = await bcrypt.hash(wachtwoord, 10);
  
  const user: IGebruiker = await gebruiker.create({
    naam: 'Test Gebruiker',
    email: 'test@example.com',
    wachtwoord: hashedPassword,
    rol: 'donateur',
  });
  
  const res = await request(app)
    .post('/api/v1/authenticatie/inloggen')
    .send({
      email: user.email,
      wachtwoord: wachtwoord,
    });
  
  return {
    token: res.body.token,
    gebruiker: user
  };
};