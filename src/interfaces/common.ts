/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorMessages } from './ErrorMessages';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessages[];
};

export type IGenericResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: any;
};
