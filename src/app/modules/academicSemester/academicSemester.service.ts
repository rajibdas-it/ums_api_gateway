import { Request } from 'express';

import { coreService } from '../../../shared/axios';

const createAcademicSemester = async (req: Request) => {
  const response = await coreService.post(
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

const getAllAcademicSemester = async (req: Request) => {req:Request} =>{
    console.log(data);
}
export const academicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
};
