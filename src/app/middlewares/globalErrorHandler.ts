/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessages } from '../../interfaces/ErrorMessages';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   res.status(400).json({ error: error })
  //upor e next ke rakhtei hobe. noile response shundor vabe dey na.
  config.node_env === 'development'
    ? console.log('Global Error Handler', error)
    : errorLogger.error('Global ErrorHandler', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessages: IGenericErrorMessages[] = [];

  if (error.name === 'ZodError') {
    const simplifiedError = handleZodError(error);
    (statusCode = simplifiedError.statusCode),
      (message = simplifiedError.message),
      (errorMessages = simplifiedError.errorMessage);
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error.message }]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
