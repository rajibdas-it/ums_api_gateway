import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidation } from './semesterRagistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationZodSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.patch(
  '/update-semester-registration/:id',
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationZodSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/delete-semester-registration/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
