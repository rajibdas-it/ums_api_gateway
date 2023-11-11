import { IPrequisiteCourseRequest } from './course.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Course, CourseFaculty, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { asyncForEach } from '../../../shared/asyncForLoop';
import prisma from '../../../shared/prisma';
import { courseSearchableFields } from './course.constant';
import { ICourseCreateData, ICourseFilters } from './course.interface';

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
      await asyncForEach(
        preRequisiteCourses,
        async (preRequisiteCourse: IPrequisiteCourseRequest) => {
          const createPreRequisiteCourse = await ts.courseToPreRequisite.create(
            {
              data: {
                courseId: result.id,
                prequisiteId: preRequisiteCourse.courseId,
              },
            },
          );
          if (!createPreRequisiteCourse) {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              'Failed to create pre-requisite',
            );
          }
        },
      );
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

const getAllCourses = async (
  options: IPaginationOptions,
  filters: ICourseFilters,
): Promise<IGenericResponse<Course[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: courseSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (filtersData && Object.keys(filtersData)) {
    andCondition.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition: Prisma.CourseWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.course.findMany({
    skip: skip,
    take: limit,
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
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

  const total = await prisma.course.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCourse = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: { id },
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
  return result;
};

const updateCourse = async (
  id: string,
  payload: ICourseCreateData,
): Promise<Course | null> => {
  const { preRequisiteCourses, ...courseData } = payload;

  await prisma.$transaction(async ts => {
    const result = await ts.course.update({
      where: { id },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'unable to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisite = preRequisiteCourses.filter(
        course => course.courseId && course.isDeleted,
      );
      const newPreRequisite = preRequisiteCourses.filter(
        course => course.courseId && !course.isDeleted,
      );
      await asyncForEach(
        deletePreRequisite,
        async (deletePreRequisiteCourse: IPrequisiteCourseRequest) => {
          await ts.courseToPreRequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  prequisiteId: deletePreRequisiteCourse.courseId,
                },
              ],
            },
          });
        },
      );

      await asyncForEach(
        newPreRequisite,
        async (newPreRequisiteCourse: IPrequisiteCourseRequest) => {
          await ts.courseToPreRequisite.create({
            data: {
              courseId: id,
              prequisiteId: newPreRequisiteCourse.courseId,
            },
          });
        },
      );
    }
    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: { id },
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
};

const assignFaculty = async (
  id: string,
  payload: string[],
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId: facultyId,
    })),
  });

  const assignFacultyData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      faculty: true,
    },
  });
  return assignFacultyData;
};

export const courseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  assignFaculty,
};
