import { AcademicDepartment } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDeparmentFilterableFields } from './academicDepartment.constant';
import { academicDepartmentService } from './academicDepartment.service';

const createDepartment = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicDepartmentService.createDepartment(data);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create new department successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationsFields);
  const filters = pick(req.query, academicDeparmentFilterableFields);
  const result = await academicDepartmentService.getAllDepartment(
    options,
    filters,
  );

  sendResponse<AcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create new department successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicDepartmentService.getSingleDepartment(id);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create new department successfully',

    data: result,
  });
});

export const academicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
};

//   sendResponse<AcademicDepartment>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Create new department successfully',
//     data: result,
//   });
