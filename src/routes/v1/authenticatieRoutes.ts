import { Router } from 'express';
import { registreerGebruiker } from '../../api/controllers/authenticatie/registrerenController';
import { loginGebruiker } from '../../api/controllers/authenticatie/inloggenController';

const router = Router();

router.post('/registreren', registreerGebruiker);
router.post('/inloggen', loginGebruiker);

export default router;
