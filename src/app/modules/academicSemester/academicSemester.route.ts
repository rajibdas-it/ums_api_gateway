import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createAcademicSemester,
);
router.get('/', academicSemesterController.getAllAcademicSemester);

router.get('/:id', academicSemesterController.getSingleAcademicSemester);

export const academicRoutes = router;
