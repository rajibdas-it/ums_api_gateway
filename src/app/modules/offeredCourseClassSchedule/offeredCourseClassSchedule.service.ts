import { OfferedCourseClassSchedule } from '@prisma/client';
import calculatePagination from '../../../helper/calculatePagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { offeredCourseClassScheduleSearchableFields } from './offeredCourseClassSchedule.constant';
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
): Promise<OfferedCourseClassSchedule[]> => {
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

  const result = await prisma.offeredCourseClassSchedule.findMany({
    skip,
    take: limit,
    where: { AND: andConditons },
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
  return result;
};

export const offeredCourseClassScheduleService = {
  createOfferedCourseClassSchedule,
  getAllOfferedCourseClassSchedule,
};
