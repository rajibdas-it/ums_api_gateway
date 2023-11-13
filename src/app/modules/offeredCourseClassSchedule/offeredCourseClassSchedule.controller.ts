import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseClassScheduleFilterableFields } from './offeredCourseClassSchedule.constant';
import { offeredCourseClassScheduleService } from './offeredCourseClassSchedule.service';

const createOfferedCourseClassSchedule = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await offeredCourseClassScheduleService.createOfferedCourseClassSchedule(
      data,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course class schedule created successfully',
    data: result,
  });
});
const getAllOfferedCourseClassSchedule = catchAsync(async (req, res) => {
  const options = pick(req.query, paginationsFields);
  const filters = pick(req.query, offeredCourseClassScheduleFilterableFields);
  const result =
    await offeredCourseClassScheduleService.getAllOfferedCourseClassSchedule(
      options,
      filters,
    );
  sendResponse<OfferedCourseClassSchedule[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course class schedule created successfully',
    data: result,
  });
});

export const offeredCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
};
