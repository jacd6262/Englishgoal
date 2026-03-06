import { Router } from 'express';
import { getActivityTypes, getActivityTypeById } from '../controllers/activityTypes.controller.js';

const router = Router();

router.get('/activity-types', getActivityTypes);
router.get('/activity-types/:id', getActivityTypeById);

export default router;