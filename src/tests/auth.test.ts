import request from 'supertest';
import app from '../app';
import Gebruiker from '../infrastructuur/database/modellen/gebruikerModel';
import bcrypt from 'bcryptjs';
import { registerAndLogin, RegisterAndLoginResult } from './test-utils';

describe('Authenticatie Endpoints', () => {
  describe('POST /api/v1/authenticatie/registreren', () => {
    it('zou een nieuwe gebruiker moeten registreren', async () => {
      const res = await request(app)
        .post('/api/v1/authenticatie/registreren')
        .send({
          naam: 'Test Gebruiker',
          email: 'test@example.com',
          wachtwoord: 'wachtwoord123',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');

      // Controleer of de gebruiker is opgeslagen in de database
      const gebruiker = await Gebruiker.findOne({ email: 'test@example.com' });
      expect(gebruiker).toBeTruthy();
      expect(await bcrypt.compare('wachtwoord123', gebruiker!.wachtwoord)).toBe(true);
    });

    it('zou geen gebruiker moeten registreren met een bestaand e-mailadres', async () => {
      await Gebruiker.create({
        naam: 'Bestaande Gebruiker',
        email: 'bestaande@example.com',
        wachtwoord: 'wachtwoord123',
      });

      const res = await request(app)
        .post('/api/v1/authenticatie/registreren')
        .send({
          naam: 'Nieuwe Gebruiker',
          email: 'bestaande@example.com', 
          wachtwoord: 'wachtwoord123',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email already exists');
    });
  });

  describe('POST /api/v1/authenticatie/inloggen', () => {
    it('zou een bestaande gebruiker moeten inloggen', async () => {
      await Gebruiker.create({
        naam: 'Test Gebruiker',
        email: 'test@example.com',
        wachtwoord: await bcrypt.hash('wachtwoord123', 10),
      });

      const res = await request(app)
        .post('/api/v1/authenticatie/inloggen')
        .send({
          email: 'test@example.com',
          wachtwoord: 'wachtwoord123',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('zou niet moeten inloggen met onjuiste inloggegevens', async () => {
      const res = await request(app)
        .post('/api/v1/authenticatie/inloggen')
        .send({
          email: 'test@example.com',
          wachtwoord: 'verkeerdwachtwoord',
        });

      expect(res.status).toBe(401); 
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  // Nieuwe test die de registerAndLogin functie gebruikt
  it('zou een gebruiker moeten registreren en inloggen', async () => {
    const result: RegisterAndLoginResult = await registerAndLogin();

    expect(result.token).toBeTruthy();
    expect(result.gebruiker).toBeTruthy();
    expect(result.gebruiker.email).toBe('test@example.com');

    // Extra verificatie: controleer of de gebruiker in de database staat
    const dbGebruiker = await Gebruiker.findOne({ email: 'test@example.com' });
    expect(dbGebruiker).toBeTruthy();
    expect(dbGebruiker!.naam).toBe('Test Gebruiker');
  });
});
