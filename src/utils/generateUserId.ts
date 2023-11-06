import { AcademicSemester } from '@prisma/client';
import prisma from '../shared/prisma';

const findLastStudentId = async (): Promise<string | unknown> => {
  const result = await prisma.student.findFirst({
    orderBy: { createdAt: 'desc' },
  });
  return result?.studentId.substring(4);
};

const generateStudentId = async (
  academicSemester: AcademicSemester | null,
): Promise<string> => {
  let incrementId = null;

  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  incrementId = (Number(currentId) + 1).toString().padStart(5, '0');
  return (incrementId = `${academicSemester?.year.substring(
    2,
  )}${academicSemester?.code}${incrementId}`);
};

export const generateId = {
  generateStudentId,
};
