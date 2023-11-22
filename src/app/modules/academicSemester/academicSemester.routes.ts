import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.getAllAcademicSemester,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  academicSemesterController.getSingleAcademicSemester,
);

router.patch(
  '/update-semester/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.updateAcademicSemester,
);

router.delete(
  '/delete-academic-semester/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.deleteAcademicSemester,
);

export const academicSemesterRoutes = router;
