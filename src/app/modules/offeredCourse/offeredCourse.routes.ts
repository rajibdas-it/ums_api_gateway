import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
const router = express.Router();

router.post('/', offeredCourseController.createOfferedCourse);

export const offeredCourseRoutes = router;
