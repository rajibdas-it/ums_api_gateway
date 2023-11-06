import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentZodValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(academicDepartmentZodValidation.createAcademicDepartment),
  academicDepartmentController.createDepartment,
);

router.get('/', academicDepartmentController.getAllDepartment);
router.get('/:id', academicDepartmentController.getSingleDepartment);

export const academicDepartmentRoutes = router;
