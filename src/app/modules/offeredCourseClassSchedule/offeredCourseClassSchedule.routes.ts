import express from 'express';
import { offeredCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post(
  '/',
  offeredCourseClassScheduleController.createOfferedCourseClassSchedule,
);
router.get(
  '/',
  offeredCourseClassScheduleController.getAllOfferedCourseClassSchedule,
);

export const classScheduleRoutes = router;
