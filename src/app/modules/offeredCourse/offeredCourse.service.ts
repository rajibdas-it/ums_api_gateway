/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourse } from '@prisma/client';
import { asyncForEach } from '../../../shared/asyncForLoop';
import prisma from '../../../shared/prisma';
import { ICreateOfferedCourse } from './offeredCourse.interface';

const createOfferedCourse = async (
  data: ICreateOfferedCourse,
): Promise<OfferedCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;
  const result: OfferedCourse[] = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const alreadyExist = await prisma.offeredCourse.findFirst({
      where: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });
    if (!alreadyExist) {
      const createCourse = await prisma.offeredCourse.create({
        data: {
          academicDepartmentId,
          semesterRegistrationId,
          courseId,
        },
        include: {
          academicDepartment: true,
          semesterRegistration: true,
          course: true,
        },
      });
      result.push(createCourse);
    }
  });
  return result;
};

export const offeredCourseService = {
  createOfferedCourse,
};
