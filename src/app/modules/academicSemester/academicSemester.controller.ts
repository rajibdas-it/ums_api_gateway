import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createAcademicSemester(req);
    sendResponse(res, result);
  },
);
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createAcademicSemester(req);
    sendResponse(res, result);
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
};
