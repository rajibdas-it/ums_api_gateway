import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const offeredCourseClassScheduleController = {
  createOfferedCourseClassSchedule,
};
