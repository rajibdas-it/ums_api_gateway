/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { config } from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userAuthService } from './auth.service';

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await userAuthService.loginUser(req);
  const { refreshToken, ...others } = result.data;

  const cookiesOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookiesOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully logged in',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await userAuthService.refreshToken(req);
  sendResponse(res, result);
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await userAuthService.changePassword(req);
  sendResponse(res, result);
});

export const userAuthController = {
  login,
  refreshToken,
  changePassword,
};
