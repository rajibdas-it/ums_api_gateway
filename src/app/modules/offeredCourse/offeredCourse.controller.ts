import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await offeredCourseService.createOfferedCourse(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'offered course created successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
};
