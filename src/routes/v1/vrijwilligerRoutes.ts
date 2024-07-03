import { Router } from 'express';
import { jwtAuthMiddleware } from '../../middlewares/authenticatie/jwtAuthMiddleware';
import { registreerVrijwilliger, haalVrijwilligers } from '../../api/controllers/vrijwilliger/vrijwilligerController';

const router = Router();

router.post('/vrijwilligers', jwtAuthMiddleware, registreerVrijwilliger);
router.get('/vrijwilligers', jwtAuthMiddleware, haalVrijwilligers);

export default router;
