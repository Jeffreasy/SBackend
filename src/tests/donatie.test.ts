import request from 'supertest';
import { registerAndLogin, RegisterAndLoginResult } from './test-utils';
import app from '../app';

describe('Donatie Endpoints', () => {
  let authResult: RegisterAndLoginResult;

  beforeEach(async () => {
    authResult = await registerAndLogin();
  });

  describe('POST /api/v1/donaties', () => {
    it('zou een nieuwe donatie moeten aanmaken', async () => {
      const res = await request(app)
        .post('/api/v1/donaties')
        .set('Authorization', `Bearer ${authResult.token}`)
        .send({
          bedrag: 50,
          donateurNaam: 'Test Donateur',
          bericht: 'Test bericht',
        });
      expect(res.status).toBe(201); 
      expect(res.body).toHaveProperty('_id');
      expect(res.body.bedrag).toBe(50);
    });

    // ... (meer tests voor validatie, autorisatie, etc.)
  });

  describe('GET /api/v1/donaties', () => {
    it('zou alle donaties moeten ophalen', async () => {
      const res = await request(app)
        .get('/api/v1/donaties')
        .set('Authorization', `Bearer ${authResult.token}`);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});