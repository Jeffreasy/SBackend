import { Router } from 'express';
import { maakDonatie } from '../../api/controllers/donatie/maakDonatieController';
import { haalDonaties } from '../../api/controllers/donatie/haalDonatiesController';
import { jwtAuthMiddleware } from '../../middlewares/authenticatie/jwtAuthMiddleware';

const router = Router();

router.post('/donaties', jwtAuthMiddleware, maakDonatie);
router.get('/donaties', jwtAuthMiddleware, haalDonaties);

export default router;
