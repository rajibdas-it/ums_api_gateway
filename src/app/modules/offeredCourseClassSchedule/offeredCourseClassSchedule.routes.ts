import express from 'express';
import { offeredCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post(
  '/',
  offeredCourseClassScheduleController.createOfferedCourseClassSchedule,
);

export const classScheduleRoutes = router;
