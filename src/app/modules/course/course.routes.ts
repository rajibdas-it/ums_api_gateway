import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseController } from './course.controller';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post('/create-course/', courseController.createCourse);

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.patch('/update-course/:id', courseController.updateCourse);

router.post(
  '/:id/assign-faculty',
  validateRequest(courseValidation.assignOrRemoveFaculties),
  courseController.assignFaculty,
);
router.delete(
  '/:id/remove-faculty',
  validateRequest(courseValidation.assignOrRemoveFaculties),
  courseController.removeFaculties,
);

export const courseRoutes = router;
