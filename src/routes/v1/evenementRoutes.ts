import { Router } from 'express';
import { jwtAuthMiddleware } from '../../middlewares/authenticatie/jwtAuthMiddleware';
import { maakEvenement, haalEvenementen } from '../../api/controllers/evenement/evenementController';

const router = Router();

router.post('/evenementen', jwtAuthMiddleware, maakEvenement);
router.get('/evenementen', jwtAuthMiddleware, haalEvenementen);

export default router;
