import { Prisma } from '@prisma/client';
import { IGenericErrorMessages } from '../interfaces/ErrorMessages';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: Prisma.PrismaClientValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessages[] = [
    {
      path: '',
      message: error.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  };
};

export default handleValidationError;
