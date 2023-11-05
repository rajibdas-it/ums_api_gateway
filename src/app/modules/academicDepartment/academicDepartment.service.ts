import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDepartment = async (
  data: AcademicDepartment,
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.create({
    data,
    include: {
      academicFaculty: true,
    },
  });
  return result;
};

export const academicDepartmentService = { createDepartment };
