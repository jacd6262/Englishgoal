import { Router } from 'express';
import { getActivities, getActivityById, createActivity, deleteActivity, updateActivity } from '../controllers/activity.controller.js';

const router = Router();

router.get('/activities', getActivities);
router.get('/activities/:id', getActivityById);
router.post('/activities', createActivity);
router.delete('/activities/:id', deleteActivity);
router.put('/activities/:id', updateActivity);

export default router;