import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  SemesterRegistrationController.createSemesterRegistration,
);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
