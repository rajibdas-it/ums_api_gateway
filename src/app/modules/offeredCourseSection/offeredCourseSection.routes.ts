import express from 'express';
import { offeredCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();
router.post('/', offeredCourseSectionController.createOfferedCourseSection);

export const offeredCourseSectionRoutes = router;
