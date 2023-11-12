/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourse } from '@prisma/client';
import { asyncForEach } from '../../../shared/asyncForLoop';
import prisma from '../../../shared/prisma';
import { ICreateOfferedCourse } from './offeredCourse.interface';

const createOfferedCourse = async (
  data: ICreateOfferedCourse,
): Promise<OfferedCourse[]> => {
  const { academicDepartmentId, semesterRegistrationId, courseIds } = data;
  const result: any = [];

  await asyncForEach(courseIds, async (courseId: string) => {
    const createCourse = await prisma.offeredCourse.create({
      data: {
        academicDepartmentId,
        semesterRegistrationId,
        courseId,
      },
    });
    result.push(createCourse);
  });
  return result;
};

export const offeredCourseService = {
  createOfferedCourse,
};
