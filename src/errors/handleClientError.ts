import { Prisma } from '@prisma/client';
import { IGenericErrorMessages } from '../interfaces/ErrorMessages';
import { IGenericErrorResponse } from '../interfaces/common';

const handleClientError = (
  error: Prisma.PrismaClientKnownRequestError,
): IGenericErrorResponse => {
  let errors: IGenericErrorMessages[] = [];
  let message = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found';
    errors = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete Failed';
      errors = [
        {
          path: '',
          message,
        },
      ];
    }
  }

  return {
    statusCode,
    message,
    errorMessage: errors,
  };
};

export default handleClientError;
