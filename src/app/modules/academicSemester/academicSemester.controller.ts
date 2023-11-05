import { AcademicSemester } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
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

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationsFields);
  const filters = pick(req.query, academicSemesterFilterableFields);
  //   console.log(filters);
  const result = await academicSemesterService.getAllAcademicSemester(
    filters,
    options,
  );
  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetch successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicSemesterService.getSingleAcademicSemester(id);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester data fetched',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
};
