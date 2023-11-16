import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { studentEnrolledCourseMarkService } from './studentEnrolledMark.service';

const updateStudentMarks = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await studentEnrolledCourseMarkService.updateStudentMarks(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update student marks successfully',
    data: result,
  });
});

export const studentEnrolledMarkController = {
  updateStudentMarks,
};
