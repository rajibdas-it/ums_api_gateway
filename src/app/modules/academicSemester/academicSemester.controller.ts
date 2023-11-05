import { AcademicSemester } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await academicSemesterService.createAcademicSemester(data);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created succesfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
};
