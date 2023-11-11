import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

router.post('/create-course/', courseController.createCourse);
router.post('/:id/assign-faculty', courseController.assignFaculty);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.patch('/update-course/:id', courseController.updateCourse);

export const courseRoutes = router;
