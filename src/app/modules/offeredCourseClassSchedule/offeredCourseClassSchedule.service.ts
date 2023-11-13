/* eslint-disable @typescript-eslint/no-explicit-any */
import { OfferedCourseClassSchedule, Prisma } from '@prisma/client';
import calculatePagination from '../../../helper/calculatePagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  offeredCourseClassScheduleFilterMapper,
  offeredCourseClassScheduleFilterableFields,
  offeredCourseClassScheduleSearchableFields,
} from './offeredCourseClassSchedule.constant';
import { IClassScheduleFilters } from './offeredCourseClassSchedule.interface';
import { offeredCourseClassScheduleUtils } from './offeredCourseClassSchedule.utils';

const createOfferedCourseClassSchedule = async (
  data: OfferedCourseClassSchedule,
): Promise<OfferedCourseClassSchedule> => {
  await offeredCourseClassScheduleUtils.checkRoomAvailable(data);
  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      offeredCourseSection: true,
      semesterRegistraton: true,
      room: true,
      faculty: true,
    },
  });
  return result;
};

const getAllOfferedCourseClassSchedule = async (
  options: IPaginationOptions,
  filters: IClassScheduleFilters,
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: offeredCourseClassScheduleSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //   if (searchTerm) {
  //     andConditons.push({
  //       dayOfWeek: searchTerm,
  //     });
  //   }

  //   if (filtersData && Object.keys(filtersData).length > 0) {
  //     andConditons.push({
  //       AND: Object.keys(filtersData).map(key => {
  //         if (offeredCourseClassScheduleFilterableFields.includes(key)) {
  //           return {
  //             [offeredCourseClassScheduleFilterMapper[key]]: {
  //               id: (filtersData as any)[key],
  //             },
  //           };
  //         } else {
  //           return {
  //             [key]: {
  //               equals: (filtersData as any)[key],
  //             },
  //           };
  //         }
  //       }),
  //     });
  //   }

  if (filtersData && Object.keys(filters).length > 0) {
    andConditons.push({
      AND: Object.keys(filtersData).map(key => {
        if (offeredCourseClassScheduleFilterableFields.includes(key)) {
          return {
            [offeredCourseClassScheduleFilterMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereCondition: Prisma.OfferedCourseClassScheduleWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.offeredCourseClassSchedule.findMany({
    skip,
    take: limit,
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      offeredCourseSection: true,
      semesterRegistraton: true,
      room: true,
      faculty: true,
    },
  });

  const total = await prisma.offeredCourseClassSchedule.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const offeredCourseClassScheduleService = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
};
