import { AcademicSemester } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createAcademicSemester = async (
  data: AcademicSemester,
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

export const academicSemesterService = {
  createAcademicSemester,
};
