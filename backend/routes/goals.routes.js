import { Router } from 'express';
import { getGoals, getGoalById } from '../controllers/goals.controller.js';

const router = Router();

router.get('/goals', getGoals);
router.get('/goals/:id', getGoalById);

export default router;