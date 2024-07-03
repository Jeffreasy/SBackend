import { Router } from 'express';
import { jwtAuthMiddleware } from '../../middlewares/authenticatie/jwtAuthMiddleware';
import { beveiligdEndpoint } from '../../api/controllers/beveiligd/beveiligdController';

const router = Router();

router.get('/beveiligd_endpoint', jwtAuthMiddleware, beveiligdEndpoint);

export default router;
