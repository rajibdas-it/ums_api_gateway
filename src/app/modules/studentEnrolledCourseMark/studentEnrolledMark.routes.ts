import express from 'express';
import { studentEnrolledMarkController } from './studentEnrolledMark.controller';

const router = express.Router();

router.patch(
  '/update-marks/',
  studentEnrolledMarkController.updateStudentMarks,
);

export const studentEnrollCourseMarkRoutes = router;
