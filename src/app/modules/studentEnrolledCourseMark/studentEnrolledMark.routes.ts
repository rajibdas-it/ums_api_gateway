import express from 'express';
import { studentEnrolledMarkController } from './studentEnrolledMark.controller';

const router = express.Router();

router.patch(
  '/update-marks/',
  studentEnrolledMarkController.updateStudentMarks,
);
router.patch(
  '/update-final-marks/',
  studentEnrolledMarkController.updateFinalMarks,
);

export const studentEnrollCourseMarkRoutes = router;
