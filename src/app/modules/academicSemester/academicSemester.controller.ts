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
    const result = await academicSemesterService.getAllAcademicSemester(req);
    sendResponse(res, result);
  },
);

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getSingleAcademicSemester(req);
    sendResponse(res, result);
  },
);

const updateAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterService.updateAcademicSemester(req);
  sendResponse(res, result);
});

const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.deleteAcademicSemester(req);
    sendResponse(res, result);
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
