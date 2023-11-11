import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

router.post('/create-course/', courseController.createCourse);
router.get('/', courseController.getAllCourses);

export const courseRoutes = router;
