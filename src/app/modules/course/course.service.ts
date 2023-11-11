/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICourseCreateData } from './course.interface';

const createCourse = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async ts => {
    const result = await ts.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create new course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let i = 0; i < preRequisiteCourses.length; i++) {
        const createPreRequisiteCourse = await ts.courseToPreRequisite.create({
          data: {
            courseId: result.id,
            prequisiteId: preRequisiteCourses[i].courseId,
          },
        });
        if (!createPreRequisiteCourse) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            'Failed to create pre-requisite',
          );
        }
      }
    }
    return result;
  });

  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: { id: newCourse.id },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create course');
};

export const courseService = {
  createCourse,
};
