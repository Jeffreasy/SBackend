import { Router } from 'express';
import { createDeelnemer } from '../../api/controllers/deelnemer/maakDeelnemerController';

const router = Router();

router.post('/', createDeelnemer);

export default router;
