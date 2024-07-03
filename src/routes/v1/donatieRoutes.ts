import express from 'express';
import { maakDonatie } from '../../api/controllers/donatie/maakDonatieController';
import { haalDonaties } from '../../api/controllers/donatie/haalDonatiesController';
import { jwtAuthMiddleware } from '../../middlewares/authenticatie/jwtAuthMiddleware';
import { checkRole } from '../../middlewares/authenticatie/rolAuthMiddleware';

const router = express.Router();

router.post('/donaties', jwtAuthMiddleware, checkRole(['admin', 'donateur']), maakDonatie);
router.get('/donaties', jwtAuthMiddleware, checkRole(['admin']), haalDonaties);

export default router;
