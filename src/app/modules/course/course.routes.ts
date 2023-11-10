import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

router.post('/create-course/', courseController.createCourse);

export const courseRoutes = router;
