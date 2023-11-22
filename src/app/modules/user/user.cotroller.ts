import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createStudent(req);
  sendResponse(res, result);
});

export const userController = {
  createStudent,
};
