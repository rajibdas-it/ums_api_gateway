import { AcademicDepartment } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const academicDepartmentController = {
  createDepartment,
};

//   sendResponse<AcademicDepartment>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Create new department successfully',
//     data: result,
//   });
