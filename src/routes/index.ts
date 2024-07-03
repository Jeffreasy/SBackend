import { Router } from 'express';
import authenticatieRoutes from './v1/authenticatieRoutes';
import beveiligdRoutes from './v1/beveiligdRoutes';
import deelnemerRoutes from './v1/deelnemerRoutes';
import donatieRoutes from './v1/donatieRoutes';
import evenementRoutes from './v1/evenementRoutes';
import vrijwilligerRoutes from './v1/vrijwilligerRoutes';

const router = Router();

router.use('/authenticatie', authenticatieRoutes);
router.use('/beveiligd', beveiligdRoutes);
router.use('/deelnemers', deelnemerRoutes);
router.use('/donaties', donatieRoutes);
router.use('/evenementen', evenementRoutes);
router.use('/vrijwilligers', vrijwilligerRoutes);

export default router;
