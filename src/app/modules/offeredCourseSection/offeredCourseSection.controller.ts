import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { offeredCourseSectionService } from './offeredCourseSection.service';

const createOfferedCourseSection = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await offeredCourseSectionService.createOfferedCourseSection(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course section done',
    data: result,
  });
});

export const offeredCourseSectionController = {
  createOfferedCourseSection,
};
