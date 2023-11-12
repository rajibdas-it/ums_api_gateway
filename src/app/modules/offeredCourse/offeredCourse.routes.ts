import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offeredCourseController } from './offeredCourse.controller';
import { offeredCourseValidation } from './offeredCourse.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(offeredCourseValidation.createOfferedCourseSchema),
  offeredCourseController.createOfferedCourse,
);

export const offeredCourseRoutes = router;
