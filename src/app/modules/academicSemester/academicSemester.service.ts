/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';

import { IGenericResponse } from '../../../interfaces/common';
import { coreService } from '../../../shared/axios';

const createAcademicSemester = async (
  req: Request,
): Promise<IGenericResponse> => {
  const response: IGenericResponse = await coreService.post(
    '/academic-semester/create-semester',
    req.body,
    {
      headers: {
        Authorization: req.headers.authorization,
      },
    },
  );
  return response;
};

const getAllAcademicSemester = async (
  req: Request,
): Promise<IGenericResponse> => {
  // console.log(req.query);
  const response: IGenericResponse = await coreService.get(
    '/academic-semester',
    {
      params: req.query,
      headers: {
        Authorization: req.headers.authorization,
      },
    },
  );
  return response;
};
export const academicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
};
